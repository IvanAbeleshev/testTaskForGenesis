import { dataApp } from "./appData";
import SceneSelect, { addChangeProgressBar, addDataLexi } from "./commonFunctions";

export class GameScene1 extends SceneSelect {
    constructor() {
        super({
        key: "GameScene1"
        });
    }

    preload() {
        dataApp.currentStage = 2;
        super.preload();
        addDataLexi(this);
    }

    create() {
        super.create();

        this.choice1.setScale(0.10);
        this.choice2.setScale(0.10);

        this.choice1.y +=20;
        this.choice2.y +=20;

        const handlerPress = (pointer,gameObject) =>{

            addChangeProgressBar(this);

            if(this.hitpointer){
                this.hitpointer.destroy();
            }

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
                this.scene.start('GameScene2');
            },1000);
        };
        this.input.on('gameobjectdown', handlerPress);      
        
    }
}