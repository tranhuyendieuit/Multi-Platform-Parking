<template>
    <div>
        <button type="button" class="btn btn-primary" @click="sendMessage()">Send message</button>
        {{ message }}
    </div>
</template>
<script>
import { database, ref, push, onValue } from '@/firebase/firebase';
export default {
    name: "Demo",
    data() {
        return {
            message: [],
            count: 1,
        }
    },

    mounted() {
        this.$toast.show(`Hey! I'm here`, {
            type: 'error',
            position: 'bottom',
            dismissible: true
        });
        this.getMessage()
    },

    methods: {
        sendMessage() {
            push(ref(database, "message-key"),
                {
                    'user': 'demo',
                    'count': this.count++,
                }
            )
        },

        getMessage() {
            onValue(ref(database, "checking-636a6a0661df7f77b1984de7"),
                datas => {
                    this.message = []
                    console.log(datas)
                    datas.forEach(data => {
                        this.message.push(data.val())
                    });
                }
            )
        }
    },
};
</script>
  