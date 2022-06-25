import { Scene } from "phaser";
import { dataApp } from "./appData";
import { addDataLexi, createAnimation, createObjLexi, hideSentence } from "./commonFunctions";

export class AmazingScene extends Scene {
    constructor() {
        super({
        key: "amazingScene"
        });
    }

    preload() {
        dataApp.currentStage = 5;
        addDataLexi(this);
        this.load.path = 'newImg/';
        this.load.image('backgroundImage', 'finalBackground.png');
        this.load.image('Jack', 'Jack.png');
        
        this.load.path = 'newImg/amazingScene/';
        this.load.image('sentenceJack', 'JackSentance.png');

    }
    
    create() {
        this.cameras.main.setBounds(0, 0, 1080, 980);
        this.cameras.main.scrollX +=100;

        createObjLexi(this, 'LexiJoy', 'emotionJoy');
        createObjLexi(this, 'LexiDefault', 'emotionDefault');

        this.joyAnimation = createAnimation(['LexiDefault', 'LexiJoy'], 'joy', this);

        const background = this.add.image(-200, 0, 'backgroundImage').setOrigin(0);

        const Jack = this.add.image(400, 400, 'Jack').setScale(0.5);
        this.Lexi = this.add.sprite(200, 420, 'LexiDefault').setScale(0.3);
        const sentenceJack = this.add.image(300, 550, 'sentenceJack').setScale(0.3);
             
        const idTimer = setTimeout(() => {
            hideSentence(sentenceJack);
            
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
                    this.Lexi.play(this.joyAnimation);
                    clearInterval(idLexiMove);
                }
            }, 3);
           
        }, 1300);

        const idTimer3 = setTimeout(() => {
            this.scene.start('endScene');           
        }, 3000);
        
    }

};