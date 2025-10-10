import { Injectable } from '@nestjs/common';
import { Notification } from 'src/database/models/Notification';

@Injectable()
export class NotificationService {

    getNotifications = async (user_id: string, limit: number, page: number ) => {
        
        const start = (Number(page) - 1) * Number(limit);

        const unreadNotificationCount = await Notification.count( { where: { user_id, is_read: false }});
        
        const notifications = await Notification.findAll(
            {
                where: {
                    user_id,
                },
                order: [["createdAt", "DESC"]],
                offset: Number(start), 
                limit: Number(limit)

            }
        )

        const totalPages = Math.ceil(unreadNotificationCount / Number(limit)); 

        return {
            success: true,
            data: { totalPages, unreadNotificationCount, notifications },
            message: "Notifications found!"
        };

    }
}
