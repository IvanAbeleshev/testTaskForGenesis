import { Scene } from "phaser";

export class LooseScene extends Scene {
    constructor() {
        super({
        key: "looseScene"
        });
    }

    init(data){
        this.selectedDress = data.selectedDress;
        this.selectedAccessory = data.selectedAccessory;
        this.selectedAccessory2 = data.selectedAccessory2;
    } 

    preload() {

        this.load.path = 'img/';
        this.load.image('backgroundImage', 'finalBackground.png');

        this.load.path = 'img/Scene3/';
        this.load.image('LXDefLos', `Lexi-default-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);
        this.load.image('LXJoyLos', `Lexi-joy-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);
        this.load.image('LXSadLos', `Lexi-sad-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);

        this.load.path = 'img/amazingScene/';
        this.load.image('Jack', 'Jack.png');

        this.load.path = 'img/looseScene/';
        this.load.image('sentenceJackLoose', 'JackSentence.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        
        this.cameras.main.setBounds(0, 0, 1080, 980);
        this.cameras.main.scrollX +=100;
        this.anims.create({
            key: 'LXLos',
            frames: [
                { key: 'LXDefLos' },
                { key: 'LXSadLos', duration: 1 }
            ],
            frameRate: 2,
            repeat: 1
        });

        const background = this.add.image(-200, 0, 'backgroundImage').setOrigin(0);

        const Jack = this.add.image(400, 400, 'Jack').setScale(0.5);
        this.Lexi= this.add.sprite(200, 420, 'LXDefLos').setScale(0.3);
        const sentenceJack = this.add.image(300, 550, 'sentenceJackLoose').setScale(0.3);
             
        const idTimer = setTimeout(() => {
            let currentSacaleValue = sentenceJack.scale;
            const keyInterval = setInterval(() => {
                sentenceJack.setScale(currentSacaleValue);
                currentSacaleValue -=0.02;
                if(currentSacaleValue <= 0){
                    sentenceJack.destroy();
                    clearInterval(keyInterval);
                }
            }, 10);
            
            const keyIntervalJack = setInterval(() => {
                Jack.x +=3;
                if(Jack.x >= 600){
                    Jack.destroy();
                    clearInterval(keyIntervalJack);
                }
            }, 5);
        }, 1000);
    
        const idTimer2 = setTimeout(() => {
            let distance = 0;
            const idLexiMove = setInterval(() => {
                this.cameras.main.scrollX -=1;
                distance ++;
                if(distance >= 100){
                    this.Lexi.play('LXLos');
                    clearInterval(idLexiMove);
                }
            }, 3);
           
        }, 1300);

        const idTimer3 = setTimeout(() => {
            this.scene.start('retryScene');           
        }, 3000);
        
    }

};