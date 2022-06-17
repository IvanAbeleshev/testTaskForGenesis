import { Scene } from "phaser";

export class AmazingScene extends Scene {
    constructor() {
        super({
        key: "amazingScene"
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
        this.load.image('LXDefAm', `Lexi-default-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);
        this.load.image('LXJoyAm', `Lexi-joy-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);
        
        this.load.path = 'img/amazingScene/';
        this.load.image('Jack', 'Jack.png');
        this.load.image('sentenceJack', 'JackSentance.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        this.cameras.main.setBounds(0, 0, 1080, 980);
        this.cameras.main.scrollX +=100;

        this.anims.create({
            key: 'LXJoyAm',
            frames: [
                { key: 'LXDefAm' },
                { key: 'LXJoyAm', duration: 1 }
            ],
            frameRate: 2,
            repeat: 1
        });

        const background = this.add.image(-200, 0, 'backgroundImage').setOrigin(0);

        const Jack = this.add.image(400, 400, 'Jack').setScale(0.5);
        this.Lexi= this.add.sprite(200, 420, 'LXDefAm').setScale(0.3);
        const sentenceJack = this.add.image(300, 550, 'sentenceJack').setScale(0.3);
             
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
                    this.Lexi.play('LXJoyAm');
                    clearInterval(idLexiMove);
                }
            }, 3);
           
        }, 1300);

        const idTimer3 = setTimeout(() => {
            this.scene.start('endScene');           
        }, 3000);
        
    }

};