import { dataApp } from "./appData";
import SceneSelect, { addDataLexi } from "./commonFunctions";

export class GameSceneTutorial extends SceneSelect {
    constructor() {
        super({
        key: "GameSceneTutorial"
        });
    }

    preload() {
        super.preload();
        dataApp.currentStage = 1;
        addDataLexi(this);
    }
    
    create() {
        super.create();
        this.background.tint = 0x808080;
        
        const textBox = this.add.graphics();
        textBox.fillStyle(0x222222, 0.8);
        textBox.fillRoundedRect(30, 10, 340, 50);

        const style = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        const text = this.add.text(60, 20, "Choose your appearance", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        this.choice1.setScale(0.10);
        this.choice2.setScale(0.10);

        const handlerPress = (pointer,gameObject) =>{
            
            this.background.clearTint();
            textBox.destroy();
            text.destroy();
            if(this.hitpointer){
                this.hitpointer.destroy();
            }

            dataApp.dress.pop();
            if(gameObject===this.choice1){
                dataApp.dress.push('Select'+dataApp.currentStage+'/choice1');
            }else{
                dataApp.dress.push('Select'+dataApp.currentStage+'/choice2');
            }

            dataApp.delayBeforeShowPointer = 2000;

            this.choice1.destroy();
            this.choice2.destroy();
            this.dressBox1.destroy();
            this.dressBox2.destroy();

            this.Lexi.play(this.joyAnimation);

            setTimeout(()=>{
                this.scene.start('GameScene1');
            },1000);
        };
        this.input.on('gameobjectdown', handlerPress);      
        
    }

};

