Vue.component('dropdown-toggle-menu', {
    data: function () {
        return {
            show: false
        }
    },
    template: `<div class="dropdown-toggle"><i class="fas fa-chevron-down" v-show="!show" @click="show=true"></i><i class="fas fa-chevron-up" v-show="show" @click="show=false"></i><div class="drop-down-menu" v-show="show"><ul><li>informazioni</li><li v-on:click="$emit('delete-message'); show = false">cancella messaggio</li></ul></div></div>`
  });

const app = new Vue({
    el: '#app',
    data: {
        userName: "",
        openChat: 0,
        inputText: "",
        contactSearchString: "",
        notificationPermission: false,
        contacts: [],
        isTypingBot: false
    },
    
    methods: {
        activeNotification() {
            this.notificationPermission = true;
        },
        setOpenChat(index) {
            this.openChat = index;
        },
        visibilityCheck(contacts) {
            return contacts.filter((contact) => {return contact.visible});
        },
        searchInContacts(){
            if (this.contactSearchString != "") {
                this.contacts.forEach((contact) => {contact.visible = false});
                this.contacts.forEach((contact) => {
                    if (contact.name.toLowerCase().includes(this.contactSearchString.toLowerCase())) {
                        contact.visible = true;
                    }
                });
            } else {
                this.contacts.forEach((contact) => {contact.visible = true});
            }
        },
        setDataBaseIndex(contact) {
            for(let index in this.contacts) {
                if(this.contacts[index].name == contact.name) {
                    return index;
                }
            }
        },
        lastReceivedMessage(messages) {
            const receivedMessages = messages.filter((message) => {return message.status == "received"});
            return receivedMessages[receivedMessages.length - 1];
        },
        logStatus() {
            const lastReceivedMessage = this.lastReceivedMessage(this.contacts[this.openChat].messages);
            if(this.isTypingBot) {
                return "sta scrivendo";
            } if(lastReceivedMessage) {
                return "Ultimo accesso oggi alle: " + lastReceivedMessage.date;
            } else {
                return "online";
            }
        },
        abbMessage(message){
            let distance = Math.floor(window.innerWidth/70);
            let abbMessage = message;
            if (message.length > distance) {
                abbMessage = message.slice(0, distance);
                abbMessage += "...";
            }
            return abbMessage;
        },
        sendMessage() {
            const controlForText = this.inputText.replace(/ /g, "");
            if (controlForText != "") {
                const newDate = new Date();
                const currentDate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
                const newMessage = {
                    date: currentDate,
                    text: this.inputText,
                    status: "sent"
                }
                this.contacts[this.openChat].messages.push(newMessage);
                this.inputText = "";
                const messages = document.querySelectorAll(".message-box");
                // questo timer mi assicura che il messaggio sia già renderizzato prima di scrollare la window su di lui
                setTimeout(() => {messages[messages.length - 1].scrollIntoView()}, 10);
            }
        },
        receiveARandomMessage() {
            const randomMessages= [
                "hey.. come stai?",
                "Ciao lettore",
                "Da quanto tempo non ci sentiamo",
                "Non mi devi più rivolgere la parola",
                "Hai sentito le ultime novità sulle nuove schede grafiche Intel?"
            ];
            const selectThisChat = this.openChat;
            const replyTime = Math.random()*5000;
            setTimeout(() => {this.isTypingBot = true}, replyTime/3);
            setTimeout(() => {
                const newDate = new Date();
                    const currentDate = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear() + " " + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
                    const newMessage = {
                        date: currentDate,
                        text: randomMessages[Math.floor(Math.random()*randomMessages.length)],
                        status: "received"
                    }
                    this.contacts[selectThisChat].messages.push(newMessage);
                    this.isTypingBot = false;
                    const messages = document.querySelectorAll(".message-box");
                    // questo timer mi assicura che il messaggio sia già renderizzato prima di scrollare la window su di lui
                    setTimeout(() => {messages[messages.length - 1].scrollIntoView()}, 10);
                },
            replyTime);
        },
        deleteMessage(index) {
            if( this.contacts[this.openChat].messages.length != 1) {
                this.contacts[this.openChat].messages.splice(index, 1);
            } else {
                this.contacts.splice(this.openChat, 1);
            }
        } 
    },
    created() {
        this.userName = "Nome Utente";
        this.contacts = [
            {
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent",
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent",
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received",
                    },
                ],
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent",
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received",
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent",
                    },
                ],
            },
          
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received",
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent",
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received",
                    },
                ],
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent",
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received",
                    },
              ],
            },
        ];
    }
    
});