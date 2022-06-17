import { Scene } from "phaser";

export class GameScene3 extends Scene {
    constructor() {
        super({
        key: "GameScene3"
        });
    }

    init(data){
        this.selectedDress = data.selectedDress;
        this.selectedAccessory = data.selectedAccessory;
        this.selectedAccessory2 = data.selectedAccessory2;
    }

    preload() {

        this.load.path = 'img/intro/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        this.load.path = 'img/Scene3/';
        this.load.image('LXDef3', `Lexi-default-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);
        this.load.image('LXJoy3', `Lexi-joy-${this.selectedDress}-${this.selectedAccessory}-${this.selectedAccessory2}.png`);

        this.load.image('withMake', 'withMakeup.png');
        this.load.image('withoutMake', 'withoutMakeup.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        
        this.anims.create({
            key: 'LXJoy3',
            frames: [
                { key: 'LXDef3' },
                { key: 'LXJoy3', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);

        const Lexi= this.add.sprite(200, 420, 'LXDef3').setScale(0.4);
           
        const dressBox1 = this.add.graphics();
        dressBox1.fillStyle(0xffffff, 0.8);
        dressBox1.fillRoundedRect(30, 490, 140, 170);

        const dressBox2 = this.add.graphics();
        dressBox2.fillStyle(0xffffff, 0.8);
        dressBox2.fillRoundedRect(230, 490, 140, 170);

        const withMake = this.add.image(100, 580, 'withMake').setScale(0.3);
        const withoutMake = this.add.image(300, 580, 'withoutMake').setScale(0.3);

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
        progressBar.fillRect(30, 20, 340/4*3, 15);
        
        withMake.setInteractive();
        withoutMake.setInteractive();
        
        const handlerPress = (pointer,gameObject) =>{
            clearTimeout(idTimerPointer);
            progressBar.destroy()
            if(this.hitpinter != undefined){
                this.hitpinter.destroy();
            };
            const progressBarNew = this.add.graphics();
            progressBarNew.fillStyle(0xfa9c1b, 0.5);
            progressBarNew.fillRect(30, 20, 340, 15);

            let currentAccessory = '';
            if(gameObject===withMake){
                currentAccessory = 'withMake';
            }else{
                currentAccessory = 'withoutMake';
            }

            withMake.destroy();
            withoutMake.destroy();
            dressBox1.destroy();
            dressBox2.destroy();

            Lexi.play('LXJoy3');
            setTimeout(()=>{
                if(this.selectedDress ==='dress'){
                    this.scene.start('amazingScene', {selectedDress: this.selectedDress, selectedAccessory: this.selectedAccessory, selectedAccessory2: this.selectedAccessory2});
                }else{
                    this.scene.start('looseScene', {selectedDress: this.selectedDress, selectedAccessory: this.selectedAccessory, selectedAccessory2: this.selectedAccessory2});
                }
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