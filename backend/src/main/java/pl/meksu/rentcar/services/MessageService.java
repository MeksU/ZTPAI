package pl.meksu.rentcar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.meksu.rentcar.models.Message;
import pl.meksu.rentcar.repo.MessageRepository;

import java.util.List;

@Service
@Transactional
public class MessageService {

    @Autowired
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message getMessageById(int id) {
        return messageRepository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public void deleteMessage(int id) {
        if (messageRepository.existsById(id)) {
            messageRepository.deleteById(id);
        } else {
            throw new RuntimeException("Message not found");
        }
    }
}
