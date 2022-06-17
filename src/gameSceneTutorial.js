import { Scene } from "phaser";

export class GameSceneTutorial extends Scene {
    constructor() {
        super({
        key: "GameSceneTutorial"
        });
    }

    preload() {
        //this.load.atlas('introMan', 'img/intro_man.png', 'img/intro_man.json');
        
        this.load.path = 'img/intro/';
        this.load.image('introBackgroundImage', 'introBackgroundImage.png');

        this.load.path = 'img/intro/Lexi/';
        this.load.image('LexiDefault', 'Lexi-default.png');
        this.load.image('LexiJoy', 'Lexi-joy.png');
  
        this.load.path = 'img/Tutorial/';
        this.load.image('dress', 'Dress.png');
        this.load.image('pantsuit', 'pantsuit.png');

        this.load.path = 'img/';
        this.load.image('hitpointer', 'cursor.png');

    }
    
    create() {
        this.anims.create({
            key: 'LexiJoy',
            frames: [
                { key: 'LexiDefault' },
                { key: 'LexiJoy', duration: 1.5 }
            ],
            frameRate: 2,
            repeat: 1.5
        });

        const background = this.add.image(0, 350, 'introBackgroundImage').setScale(0.8);
        background.tint = 0x808080;

        const Lexi= this.add.sprite(200, 420, 'LexiDefault').setScale(0.4);
        var style = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        const textBox = this.add.graphics();
        textBox.fillStyle(0x222222, 0.8);
        textBox.fillRoundedRect(30, 10, 340, 50);

        const text = this.add.text(60, 20, "Choose your appearance", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    

        const dressBox1 = this.add.graphics();
        dressBox1.fillStyle(0xffffff, 0.8);
        dressBox1.fillRoundedRect(30, 490, 140, 170);

        const dressBox2 = this.add.graphics();
        dressBox2.fillStyle(0xffffff, 0.8);
        dressBox2.fillRoundedRect(230, 490, 140, 170);

        const dress = this.add.image(100, 580, 'dress').setScale(0.7);
        const pantsuit = this.add.image(300, 580, 'pantsuit').setScale(0.7);

        this.hitpinter = this.add.image(150, 650, 'hitpointer').setScale(0.5);

        this.moveRight = true;
        this.moveLeft = false;
        
        const handlerPress = (pointer,gameObject) =>{
            background.clearTint();
            textBox.destroy();
            text.destroy();
            this.hitpinter.destroy();

            let currentDress = '';
            if(gameObject===dress){
                currentDress = 'dress';
            }else{
                currentDress = 'pantsuit';
            }

            dress.destroy();
            pantsuit.destroy();
            dressBox1.destroy();
            dressBox2.destroy();

            Lexi.play('LexiJoy');
            setTimeout(()=>{
                this.scene.start('GameScene1', {selectedDress: currentDress});
            },1000);
        };

        dress.setInteractive();
        pantsuit.setInteractive();

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

