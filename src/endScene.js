import { Scene } from "phaser";

export class EndScene extends Scene {
    constructor() {
        super({
        key: "endScene"
        });
    }
    
    preload(){
        this.load.path = 'newImg/';
        this.load.image('hitpointer', 'cursor.png');
    }

    create() {
        
        const style = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        const textBox = this.add.graphics();
        textBox.fillStyle(0x222222, 0.8);
        textBox.fillRoundedRect(100, 350, 200, 50);

        const text = this.add.text(110, 360, "Swipe to play!", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const handleLink = () =>{
            const url = 'https://apps.apple.com/us/app/id1491717191';
    
            const s = window.open(url, '_blank');
        
            if (s && s.focus)
            {
                s.focus();
            }
            else if (!s)
            {
                window.location.href = url;
            }

        }
        this.input.on('pointerup', handleLink, this);
        
        this.hitpinter = this.add.image(250, 650, 'hitpointer').setScale(0.5).setRotation(30); 
        
        this.moveUp = true;
        this.moveDown = false;
    }
    
    update(){
        if(this.hitpinter != undefined){
            if(this.hitpinter.y <= 450 && this.moveUp){
                this.moveUp = false;
                this.moveDown = true;
                this.hitpinter.setScale(0.5);
            }

            if(this.hitpinter.y>=650 && this.moveDown){
                this.moveUp = true;
                this.moveDown = false;
                this.hitpinter.setScale(0.45);
            }

            if(this.moveUp){
                this.hitpinter.y -= 3;
            }
            
            if(this.moveDown){
                this.hitpinter.y += 3;
            }
        }
    }
    
};