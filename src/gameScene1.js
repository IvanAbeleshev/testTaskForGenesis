import { Scene } from "phaser";

export class GameScene1 extends Scene {
    constructor() {
        super({
        key: "GameScene1"
        });
    }

    init(data){
        this.selectedDress = data.selectedDress;
    }

    preload() { 

        this.load.path = 'img/intro/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        this.load.path = 'img/Scene1/';
        this.load.image('LXDef', `Lexi-default-${this.selectedDress}.png`);
        this.load.image('LXJoy', `Lexi-joy-${this.selectedDress}.png`);
        this.load.image('choker', 'choker.png');
        this.load.image('necklace', 'necklace.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        
        this.anims.create({
            key: 'LXJoy',
            frames: [
                { key: 'LXDef' },
                { key: 'LXJoy', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);

        const Lexi= this.add.sprite(200, 420, 'LXDef').setScale(0.4);
           
        const dressBox1 = this.add.graphics();
        dressBox1.fillStyle(0xffffff, 0.8);
        dressBox1.fillRoundedRect(30, 490, 140, 170);

        const dressBox2 = this.add.graphics();
        dressBox2.fillStyle(0xffffff, 0.8);
        dressBox2.fillRoundedRect(230, 490, 140, 170);

        const choker = this.add.image(100, 580, 'choker').setScale(0.5);
        const necklace = this.add.image(300, 590, 'necklace').setScale(0.4);

        
        const idTimerPointer = setTimeout(() => {
            this.hitpinter = this.add.image(150, 650, 'hitpointer').setScale(0.5);            
        }, 2000);

        this.moveRight = true;
        this.moveLeft = false;

        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.8);
        progressBox.fillRect(30, 20, 340, 15);

        const progressBar = this.add.graphics();
        progressBar.fillStyle(0xfa9c1b, 0.5);
        progressBar.fillRect(30, 20, 340/4, 15);
        
        choker.setInteractive();
        necklace.setInteractive();
        
        const handlerPress = (pointer,gameObject) =>{
            clearTimeout(idTimerPointer);
            progressBar.destroy()
            if(this.hitpinter != undefined){
                this.hitpinter.destroy();
            };
            const progressBarNew = this.add.graphics();
            progressBarNew.fillStyle(0xfa9c1b, 0.5);
            progressBarNew.fillRect(30, 20, 340/2, 15);

            let currentAccessory = '';
            if(gameObject===choker){
                currentAccessory = 'choker';
            }else{
                currentAccessory = 'necklace';
            }

            choker.destroy();
            necklace.destroy();
            dressBox1.destroy();
            dressBox2.destroy();

            Lexi.play('LXJoy');
            setTimeout(()=>{
                this.scene.start('GameScene2', {selectedDress: this.selectedDress, selectedAccessory: currentAccessory});
            },1000);
            
        };
        
        this.input.on('gameobjectdown', handlerPress);
    }


    update(){
        if(this.hitpinter != undefined){
            if(this.hitpinter.x>= 340 && this.moveRight){
                this.moveRight = false;
                this.moveLeft = true;
            }

            if(this.hitpinter.x<=140 && this.moveLeft){
                this.moveRight = true;
                this.moveLeft = false;
            }

            if(this.moveRight){
                this.hitpinter.x += 3;
            }
            
            if(this.moveLeft){
                this.hitpinter.x -= 3;
            }
        }
    }
};