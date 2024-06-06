package pl.meksu.rentcar.services;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import pl.meksu.rentcar.config.RabbitMQConfig;
import pl.meksu.rentcar.models.Message;
import pl.meksu.rentcar.models.User;

@Service
public class MessageConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveMessage(Message message) {
        sendEmail(message);
    }

    private void sendEmail(Message message) {
        User user = message.getUser();

        System.out.println("Email sent to: " + user.getMail());
        System.out.println("Subject: RentCar contact form");
        System.out.println("We received your message:");
        System.out.println(message.getContent());
        System.out.println("We will answer as soon possible.");
        System.out.println("Best regards,RentCar Team");
    }
}