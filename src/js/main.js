
/**
 *  エントリポイントファイル
 */

// jsモジュールの読み込み
import dummyModule from './modules/dummy.js'

// tsモジュールの読み込み
import dummyTsModule from './ts/dummy.ts'

// scssを読み込み
import '../scss/style.scss'

dummyModule();
console.log(dummyTsModule(3, 9));