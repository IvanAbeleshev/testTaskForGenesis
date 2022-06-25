import { Scene } from "phaser";
import { addDataLexi, createAnimation, createObjLexi, showSentence, hideSentence } from "./commonFunctions";

export class GameSceneIntro extends Scene {
    constructor() {
        super({
        key: "GameSceneIntro"
        });
    }

    preload() {    
        this.load.path = 'newImg/intro/';
        this.load.image('sentenceLexi1', 'sentenceLexy1.png');
        this.load.image('sentenceLexi2', 'sentenceLexy2.png');
        this.load.path = 'newImg/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        addDataLexi(this);

    }
    
    create() {

        //add bg
        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);
        background.tint = 0x808080;

        //create textures hero Lexi
        createObjLexi(this, 'LexiJoy', 'emotionJoy');
        createObjLexi(this, 'LexiSurprised', 'emotionSurprised');
        createObjLexi(this, 'LexiDefault', 'emotionDefault');

        //create animations
        const surprisedAnimation = createAnimation(['LexiDefault', 'LexiSurprised'], 'surprised', this);
        const joyAnimation = createAnimation(['LexiDefault', 'LexiJoy'], 'joy', this);

        //render Lexi
        const Lexi = this.add.sprite(200, 400, 'LexiDefault').setScale(0.4);
        Lexi.play(surprisedAnimation);

        //add sentences
        const sentenceLexi1 = this.add.image(200, 370, 'sentenceLexi1').setScale(0);
        const sentenceLexi2 = this.add.image(200, 370, 'sentenceLexi2').setScale(0);

        showSentence(sentenceLexi1);
        
        setTimeout(() => {
            hideSentence(sentenceLexi1);
            Lexi.stop();
            Lexi.play(joyAnimation);
        }, 1500);

        setTimeout(() => {
            showSentence(sentenceLexi2);
        }, 1700);

        setTimeout(() => {
            hideSentence(sentenceLexi2);
            Lexi.stop();
        }, 3000);

        
        setTimeout(() => {
            this.scene.start('GameSceneTutorial');
        }, 3100);
        
    }

};
