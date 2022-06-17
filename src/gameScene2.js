import { Scene } from "phaser";

export class GameScene2 extends Scene {
    constructor() {
        super({
        key: "GameScene2"
        });
    }

    init(data){
        this.selectedDress = data.selectedDress;
        this.selectedAccessory = data.selectedAccessory;
    }

    preload() {

        this.load.path = 'img/intro/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        this.load.path = 'img/Scene2/';
        this.load.image('LXDef2', `Lexi-default-${this.selectedDress}-${this.selectedAccessory}.png`);
        this.load.image('LXJoy2', `Lexi-joy-${this.selectedDress}-${this.selectedAccessory}.png`);

        this.load.image('glasses', 'glasses.png');
        this.load.image('blueBag', 'blueBag.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        
        this.anims.create({
            key: 'LXJoy2',
            frames: [
                { key: 'LXDef2' },
                { key: 'LXJoy2', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);

        const Lexi= this.add.sprite(200, 420, 'LXDef2').setScale(0.4);
           
        const dressBox1 = this.add.graphics();
        dressBox1.fillStyle(0xffffff, 0.8);
        dressBox1.fillRoundedRect(30, 490, 140, 170);

        const dressBox2 = this.add.graphics();
        dressBox2.fillStyle(0xffffff, 0.8);
        dressBox2.fillRoundedRect(230, 490, 140, 170);

        const glasses = this.add.image(100, 580, 'glasses').setScale(0.5);
        const blueBag = this.add.image(300, 580, 'blueBag').setScale(0.3);

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
        progressBar.fillRect(30, 20, 340/2, 15);
        
        glasses.setInteractive();
        blueBag.setInteractive();
        
        const handlerPress = (pointer,gameObject) =>{
            clearTimeout(idTimerPointer);
            progressBar.destroy()
            if(this.hitpinter != undefined){
                this.hitpinter.destroy();
            };
            const progressBarNew = this.add.graphics();
            progressBarNew.fillStyle(0xfa9c1b, 0.5);
            progressBarNew.fillRect(30, 20, 340/4*3, 15);

            let currentAccessory = '';
            if(gameObject===glasses){
                currentAccessory = 'glasses';
            }else{
                currentAccessory = 'blueBag';
            }

            glasses.destroy();
            blueBag.destroy();
            dressBox1.destroy();
            dressBox2.destroy();

            Lexi.play('LXJoy2');
            setTimeout(()=>{
                this.scene.start('GameScene3', {selectedDress: this.selectedDress, selectedAccessory: this.selectedAccessory, selectedAccessory2: currentAccessory});
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