import { Scene } from "phaser";

export class GameSceneIntro extends Scene {
    constructor() {
        super({
        key: "GameSceneIntro"
        });
    }

    preload() {
        //this.load.atlas('introMan', 'img/intro_man.png', 'img/intro_man.json');
        
        this.load.path = 'img/intro/';

        this.load.image('sentenceLexi1', 'sentenceLexy1.png');
        this.load.image('sentenceLexi2', 'sentenceLexy1.png');
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        this.load.path = 'img/intro/Lexi/';
        this.load.image('LexiDefault', 'Lexi-default.png');
        this.load.image('LexiJoy', 'Lexi-joy.png');
        this.load.image('LexiSurprised', 'Lexi-surprised.png');
    }
    
    create() {
        
        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);
        background.tint = 0x808080;

        this.anims.create({
            key: 'LexiSurprised',
            frames: [
                { key: 'LexiDefault' },
                { key: 'LexiSurprised', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        this.anims.create({
            key: 'LexiJoy',
            frames: [
                { key: 'LexiDefault' },
                { key: 'LexiJoy', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        const Lexi= this.add.sprite(200, 400, 'LexiDefault').setScale(0.4);
        Lexi.play('LexiSurprised');

        const sentenceLexi1 = this.add.image(200, 370, 'sentenceLexi1').setScale(0.22);
        const sentenceLexi2 = this.add.image(200, 370, 'sentenceLexi2').setScale(0);
        let currentSacaleValue = 0;
        const keyInterval = setInterval(() => {
            sentenceLexi1.setScale(currentSacaleValue);
            currentSacaleValue +=0.02;
            if(currentSacaleValue>0.22){
                clearInterval(keyInterval);
            }
        }, 10);

        setTimeout(() => {
            let currentSacaleValue = sentenceLexi1.scale;
            const idSentenceLexi1 = setInterval(() => {
                sentenceLexi1.setScale(currentSacaleValue);
                currentSacaleValue -=0.02;
                if(currentSacaleValue<= 0){
                    clearInterval(idSentenceLexi1);
                    sentenceLexi1.destroy();
                }   
            }, 7);
            Lexi.stop();
            Lexi.play('LexiJoy');
        }, 1500);

        setTimeout(() => {
            let currentSacaleValue = sentenceLexi2.scale;
            const idSentenceLexi2 = setInterval(() => {
                sentenceLexi2.setScale(currentSacaleValue);
                currentSacaleValue +=0.02;
                if(currentSacaleValue > 0.22){
                    clearInterval(idSentenceLexi2);
                }   
            }, 10);
        }, 1700);

        setTimeout(() => {
            let currentSacaleValue = sentenceLexi2.scale;
            const idSentenceLexi2 = setInterval(() => {
                sentenceLexi2.setScale(currentSacaleValue);
                currentSacaleValue -=0.02;
                if(currentSacaleValue <= 0){
                    clearInterval(idSentenceLexi2);
                    sentenceLexi2.destroy();
                }   
            }, 7);
            Lexi.stop();
        }, 3000);

        
        setTimeout(() => {
            this.scene.start('GameSceneTutorial');
        }, 3100);

    }

};
