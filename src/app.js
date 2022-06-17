import Phaser from 'phaser';
import {GameSceneIntro} from './gameSceneIntro';
import {GameSceneTutorial} from './gameSceneTutorial';
import {GameScene1} from './gameScene1';
import {GameScene2} from './gameScene2';
import {GameScene3} from './gameScene3';
import {AmazingScene} from './amazingScene';
import {LooseScene} from './looseScene';
import {RetryScene} from './retryScene';
import {EndScene} from './endScene';

const config= {
    title: 'My Fantasy: Make Your Story',
    width: 400,
    height: 700,
    parent: 'container',
    backgroundColor: 'black',
    scene: [GameSceneIntro, GameSceneTutorial, GameScene1, GameScene2, GameScene3, AmazingScene, LooseScene, RetryScene, EndScene],
};


var game = new Phaser.Game(config);


