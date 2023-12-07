<script>
import * as htmlToImage from 'html-to-image';
import { useAppStore } from '@/store/app';

export default {
    props: {
        dialog:{
            Boolean
        }
    },
    mounted() {
        let qrcode = new QRCode("qrcode", {
            text: "http://jindo.dev.naver.com/collie",
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });


    },
    data(){
        let us = useAppStore();
        return {
            useAppStore: us,
            process_save: false
        }
    },
    methods: {
        save_ticket() {
            function dataURItoBlob(dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ab], { type: mimeString });
            }

            let node = document.getElementById('ticket');
            this.process_save = true;

            htmlToImage.toPng(node)
                .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    document.body.appendChild(img);

                    // Create a Blob object from the data URL
                    var blob = dataURItoBlob(dataUrl);

                    // Create a download link
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = 'image.png';
                    document.body.appendChild(a);

                    // Programmatically click the link to start the download
                    a.click();

                    // Clean up
                    document.body.removeChild(a);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                }).finally(()=>{
                    this.process_save = false;
                });
                
        }
    }
}
</script>
<template>
    <div class="main-container-ticket" id="ticket" :class="{hide: !dialog}">

        <div class="main-ticket">
            <div class="reverse">
                <div class="logo">
                    <img src="/img/cookeologo.png" alt="logo" width="80">
                </div>

                <div class="socials">
                    <div class="socials-item">
                        <v-icon icon="mdi-facebook"></v-icon>
                        cookeo
                    </div>
                    <div class="socials-item">
                        <v-icon icon="mdi-instagram"></v-icon>
                        cookeo.mg
                    </div>
                    <div class="socials-item">
                        <v-icon icon="mdi-linkedin"></v-icon>
                        cookeo.mg
                    </div>
                </div>

            </div>
            <div class="d-flex justify-content-between w-100 pa-5">
                <div class="d-flex flex-column  w-33">
                    <div class="ticket-title">
                        Ticket<br> Kadoa
                    </div>
                    <div class="date text-right">21 NOVEMBRE 2023</div>
                </div>
                <div class="d-flex flex-column">
                    <div class="client-name d-flex ga-5 align-items-center">
                        <div class="cercle"></div>
                        <div class="text"> {{ useAppStore.user.nom }}</div>
                    </div>
                    <v-row class="my-2">
                        <v-col cols-6>
                            <div>Time:</div>
                            <div class="text-h5">4:00</div>
                        </v-col>
                        <v-col cols-6>
                            <div>Price:</div>
                            <div class="text-h5">Ar 35000</div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <div>Adresse: </div>
                            <div class="text-h5">Ambatobe,</div>
                            <div class="text-h5">Rue Rakoto, Tana 101</div>
                        </v-col>
                    </v-row>
                </div>

                <div class="d-flex qr-section w-25">
                    <div>
                        <div class="text-h5">Ticket Kadoa</div>
                    </div>
                    <div id="qrcode"></div>
                    <div class="text-center font-weight-bold text-h5">Scan me</div>
                </div>
            </div>

            <div v-if="!process_save" class="actions-ticket pa-2 ">
                <v-btn color="success" prepend-icon="mdi-share">Partager</v-btn>
                <v-btn color="" variant="plain" prepend-icon="mdi-download" @click="save_ticket">Sauvegarder</v-btn>
                <v-btn color="" variant="plain" prepend-icon="mdi-close" @click="this.$emit('close')">Fermer</v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.hide{
    display: none;
}

.actions-ticket {
    background-color: black;
    color: white;
    position: absolute;
    bottom: 0;
    left: 50%;
    // width: 200px;
    transform: translate(-50%, 50%);



}

.cercle {
    width: 40px;
    height: 40px;
    background-color: black;
    border-radius: 50%;
}

#qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
}

.qr-section {
    border-left: 2px dashed black;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.main-container-ticket {
    font-family: var(--font-1);
    z-index: 1000;
    position: fixed;

    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.418);
    .main-ticket {
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        height: auto;
        width: 90%;
        background-color: white;
        color: black;
        aspect-ratio: 26/7;
        // overflow: hidden;
        display: flex;

        .ticket-title {
            font-size: 4.6em;
            font-weight: 600;
        }

        .client-name {
            font-size: 2.3em;
        }

        .reverse {
            background-color: black;
            color: white;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100px;
            justify-content: space-between;
            padding: 10px 20px;
            padding-top: 30px;

            .socials {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .socials-item {
                writing-mode: vertical-rl;
                transform: rotate(180deg);
                font-size: 0.7em;

                .v-icon {
                    transform: rotate(90deg);
                }

            }

            .logo {
                transform: rotate(-90deg);
                margin-top: 10px;
            }

            // text-orientation: sideways;
        }
    }


}
</style>
