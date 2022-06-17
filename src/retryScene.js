import { Scene } from "phaser";

export class RetryScene extends Scene {
    constructor() {
        super({
        key: "retryScene"
        });
    }
    
    create() {
        
        var style = { font: "bold 24px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        const textBox = this.add.graphics();
        textBox.fillStyle(0x222222, 0.8);
        textBox.fillRoundedRect(150, 350, 100, 50);
 
        const text = this.add.text(160, 360, "RETRY", style);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        const handleLink = () =>{
            var url = 'https://apps.apple.com/us/app/id1491717191';
    
            var s = window.open(url, '_blank');
        
            if (s && s.focus)
            {
                s.focus();
            }
            else if (!s)
            {
                window.location.href = url;
            }

        }
        this.input.on('pointerup', handleLink, this)
        
    }
    
};