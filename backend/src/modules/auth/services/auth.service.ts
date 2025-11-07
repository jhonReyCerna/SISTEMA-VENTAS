import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { AuditLog } from '../entities/audit-log.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { UserRole, Permission } from '../enums/roles.enum';

interface UserData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: UserRole[];
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      // Actualizar último login
      await this.userRepository.update(user.id, { lastLogin: new Date() });
      // Registrar en bitácora
      await this.logAction(user, 'LOGIN', { ip: 'TO_BE_IMPLEMENTED' });
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    };
  }

  async register(userData: UserData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    try {
      const savedUser = await this.userRepository.save(user);
      const { password, ...result } = savedUser;
      await this.logAction(savedUser, 'REGISTER', {});
      return result;
    } catch (error) {
      throw new UnauthorizedException('Username or email already exists');
    }
  }

  async initiatePasswordReset(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return;
    }

    const resetToken = uuidv4();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token válido por 1 hora

    await this.userRepository.update(user.id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
    });

    await this.logAction(user, 'PASSWORD_RESET_REQUESTED', {});
    // TODO: Implementar envío de email con el token
    return resetToken;
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: MoreThan(new Date())
      }
    });

    if (!user) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(user.id, {
      password: hashedPassword,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });

    await this.logAction(user, 'PASSWORD_RESET_COMPLETED', {});
  }

  async getUserPermissions(userId: number): Promise<Permission[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException();
    }

    const rolePermissions = await this.rolePermissionRepository.find({
      where: { role: In(user.roles) }
    });

    // Unir todos los permisos de los roles del usuario
    const permissions = new Set<Permission>();
    rolePermissions.forEach(rp => {
      rp.permissions.forEach(p => permissions.add(p));
    });

    return Array.from(permissions);
  }

  async logout(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      await this.logAction(user, 'LOGOUT', {});
    }
  }

  private async logAction(user: User, action: string, details: { ip?: string; [key: string]: any }) {
    const auditLog = this.auditLogRepository.create({
      user,
      action,
      details,
      ipAddress: details.ip || '',
    });
    await this.auditLogRepository.save(auditLog);
  }
}