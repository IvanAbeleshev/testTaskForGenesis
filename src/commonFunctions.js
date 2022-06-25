import Phaser from 'phaser';
import { dataApp } from './appData';

export const addDataLexi = (context) =>{
    context.load.path = 'newImg/girl/';
    context.load.image('body', 'body.png');
    context.load.image('dressRegular', 'dressRegular.png');
    context.load.image('emotionDefault', 'Emotion_default.png');
    context.load.image('emotionJoy', 'Emotion_joy.png');
    context.load.image('emotionSad', 'Emotion_sad.png');
    context.load.image('emotionSurprised', 'Emotion_surprised.png');
    context.load.image('hair', 'hair.png');

    context.load.path = 'newImg/girl/';
    dataApp.dress.forEach(element=>{
        context.load.image('element', element+'.png');
    })
    if(dataApp.currentStage >0 && dataApp.currentStage<=dataApp.countStage){
        context.load.path = 'newImg/girl/select'+dataApp.currentStage+'/';
        context.load.image('Select'+dataApp.currentStage+'/choice1', 'choice1.png');
        context.load.image('Select'+dataApp.currentStage+'/choice2', 'choice2.png');
    }

    if(dataApp.dress.length === 0){
        dataApp.dress.push('dressRegular');
    }
}

export const createAnimation = (arrayImg, preName, context) =>{
    const keysArray = arrayImg.map((element, index) => arrayImg.length === index?{key: element}:{key: element, duration: 1.5});

    context.anims.create({
        key: preName +'Animation'+dataApp.currentStage,
        frames: keysArray,
        frameRate: 2,
        repeat: 1.5
    });

    return preName +'Animation'+dataApp.currentStage;
}

export const createObjLexi = (context, name, emotion) =>{
    const rt = context.make.renderTexture({width: 1204, height: 2736}, false);
    rt.draw('body', 0 , 0);
    rt.draw(emotion, 0 , 0);
    dataApp.dress.forEach(element => {;    
        rt.draw(element, 0 , 0);
    });
    rt.draw('hair', 0 , 0);
    
    rt.saveTexture(name);
}

export const addChangeProgressBar = (context) =>{
    if(context.progressBar){
        context.progressBar.destroy();
    }

    if(context.progressBox){
        context.progressBox.destroy();
    }

    context.progressBox = context.add.graphics();
    context.progressBox.fillStyle(0xffffff, 0.8);
    context.progressBox.fillRect(30, 20, 340, 15);

    context.progressBar = context.add.graphics();
    context.progressBar.fillStyle(0xfa9c1b, 0.5);
    context.progressBar.fillRect(30, 20, 340/dataApp.countStage * dataApp.currentStage, 15);

}

//--------------------------sentence moving--------------------------
export const showSentence = (target) => {
    let currentSacaleValue = 0;
    const idTarget = setInterval(() => {
        target.setScale(currentSacaleValue);
        currentSacaleValue +=0.02;
        if(currentSacaleValue>0.22){
            clearInterval(idTarget);
        }
    }, 10);
}

export const hideSentence = (target) =>{
    let currentSacaleValue = target.scale;
    const idTarget = setInterval(() => {
        target.setScale(currentSacaleValue);
        currentSacaleValue -=0.02;
        if(currentSacaleValue<= 0){
            clearInterval(idTarget);
            target.destroy();
        }   
    }, 7);
}

//--------------------------extend scene class us sample--------------------------
export default class SceneSelect extends Phaser.Scene{
    preload(){
    
        this.load.path = 'newImg/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');
        this.load.image('hitpointer', 'cursor.png');
        
    } 

    create(){
        this.background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);
    
        createObjLexi(this, 'LexiJoy', 'emotionJoy');
        createObjLexi(this, 'LexiDefault', 'emotionDefault');

        this.joyAnimation = createAnimation(['LexiDefault', 'LexiJoy'], 'joy', this);

        this.Lexi = this.add.sprite(200, 420, 'LexiDefault').setScale(0.4);

        this.dressBox1 = this.add.graphics();
        this.dressBox1.fillStyle(0xffffff, 0.8);
        this.dressBox1.fillRoundedRect(30, 490, 140, 170);
    
        this.dressBox2 = this.add.graphics();
        this.dressBox2.fillStyle(0xffffff, 0.8);
        this.dressBox2.fillRoundedRect(230, 490, 140, 170);
    
        if(dataApp.currentStage> 1 && dataApp.currentStage<=dataApp.countStage){
            addChangeProgressBar(this);
        }

        this.idTimerPointer = setTimeout(() => {
            this.hitpointer = this.add.image(150, 650, 'hitpointer').setScale(0.5);            
        }, dataApp.delayBeforeShowPointer);
    
        this.moveRight = true;
        this.moveLeft = false;
        
        this.choice1 = this.add.image(100, 560, 'Select'+dataApp.currentStage+'/choice1').setScale(0.10);
        this.choice2 = this.add.image(300, 560, 'Select'+dataApp.currentStage+'/choice2').setScale(0.10);
        
        this.choice1.setInteractive();
        this.choice2.setInteractive();  
        
    }

    update(){
        if(this.hitpointer != undefined){
            if(this.hitpointer.x>= 340 && this.moveRight){
                this.moveRight = false;
                this.moveLeft = true;
            }
    
            if(this.hitpointer.x<=140 && this.moveLeft){
                this.moveRight = true;
                this.moveLeft = false;
            }
    
            if(this.moveRight){
                this.hitpointer.x += 3;
            }
            
            if(this.moveLeft){
                this.hitpointer.x -= 3;
            }
        }
        
    }


}


