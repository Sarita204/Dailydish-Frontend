import React from 'react'
import '../Styles/WhatsAppChat.css';

const ChatWithUs = () => {
    const phoneNumber = '7996748513'; // Replace with your WhatsApp number
    const message = 'Hello! I need assistance.'; // Default message

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div>
            <h3 style={{
                textAlign: "center",
                padding: "20px 0"
            }}>Chat With Us</h3>
            <div className="whatsapp-chat">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <img src="../Assets/whatspapp.png" alt="Chat with us on WhatsApp" />
                </a>
            </div>
        </div>
    )
}

export default ChatWithUs
