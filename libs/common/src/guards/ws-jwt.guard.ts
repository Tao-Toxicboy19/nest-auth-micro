import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Socket } from 'socket.io'
import { verify } from 'jsonwebtoken'

export class WsJwtGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() != 'ws') {
            return true
        }

        const client: Socket = context.switchToWs().getClient()
        WsJwtGuard.validateToken(client)
        return true
    }

    static validateToken(client: Socket) {
        const { authorization } = client.handshake.headers
        const { seed } = client.handshake.query
        const token: string = authorization.split(' ')[1]
        const payload = verify(
            token,
            'VgmBOirkrV6x179MeyStIN8jr2xWQVWx' || process.env.AT_SECRET,
        )
        client['user'] = payload
        client['seed'] = seed
        return payload
    }
}
