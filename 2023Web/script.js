enchant();



window.onload = function () {
	const game = new Game(214, 430);

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分.


	//クリック音読み込み.
	const clickSndUrl = "click.mp3";						//game.htmlからの相対パス.
	game.preload([clickSndUrl]); 				//データを読み込んでおく.

	//再生ボタン.
	const videoImgUrl = "video.jpg";   //game.htmlからの相対パス.
	game.preload([videoImgUrl]);      //データを読み込んでおく.

	const firstStageImgUrl = "nishinippori.jpg";
	game.preload([firstStageImgUrl]);

	const firstStageAnsImgUrl = "firstAnser.png";
	game.preload([firstStageAnsImgUrl]);

	const secondStageImgUrl = "shinjyukusthigashi.jpg";
	game.preload([secondStageImgUrl]);

	const secondStageAnsImgUrl = "secondAns.png";
	game.preload([secondStageAnsImgUrl]);

	//読み込み終わり.
	/////////////////////////////////////////////////


	game.onload = function () {					//ロードが終わった後に呼び出される関数.

		/////////////////////////////////////////////////
		//グローバル変数 

		let gstate = 0;								//現在のゲーム状態.
		let FeedbackLebel = 0;						//gstateと同期してフィードバックを行うための変数.

		//グローバル変数終わり
		/////////////////////////////////////////////////


		const prologueScene = new Scene();					//シーン作成.
		game.pushScene(prologueScene);
		prologueScene.backgroundColor = "black";

		//ゲームの導入部分テキスト
		const prologueText = new Label();
		prologueText.font = "13px 'Russo One', sans-serif";
		prologueText.color = 'rgba(255,255,255,1)';
		prologueText.width = 250;
		prologueText.moveTo(5, 165);
		prologueScene.addChild(prologueText);
		prologueText.text = "再生ボタンを押して特定開始する<br>場所の名前を特定出来る<br>文章を見つけ、タッチしてください";

		//ゲーム用背景
		const videoUrl = new Sprite(30, 30);				//画像サイズ.
		videoUrl.moveTo(95, 230);
		videoUrl.image = game.assets[videoImgUrl];			//事前にロードしておいた画像を読み込む.
		prologueScene.addChild(videoUrl);
		videoUrl.ontouchend = function () {				//videoボタンをタッチした（タッチして離した）時にこの中の内容を実行する.
			game.assets[clickSndUrl].clone().play();
			gstate = 1;
		};

		//メインループ.
		game.onenterframe = function () {
			//ゲーム状態が第一ステージの場合.
			if (gstate == 1) {
				//ゲームシーンを新たに作り、第一ステージを開始する.
				game.popScene();						//プロローグのゲームシーンを外す.
				const firstScene = new Scene();
				game.pushScene(firstScene);			//第一ステージのシーンを挿入する.
				firstScene.backgroundColor = "black";

				//第一ステージ画像
				const firstStageUrl = new Sprite(214, 430);				//画像サイズ.
				firstStageUrl.moveTo(0, 0);
				firstStageUrl.image = game.assets[firstStageImgUrl];			//事前にロードしておいた画像を読み込む.
				firstScene.addChild(firstStageUrl);

				//第一ステージページ遷移用画像.
				const firstStageAnsUrl = new Sprite(34, 8);				//画像サイズ.
				firstStageAnsUrl.moveTo(7, 15);
				firstStageAnsUrl.image = game.assets[firstStageAnsImgUrl];			//事前にロードしておいた画像を読み込む.
				firstScene.addChild(firstStageAnsUrl);
				firstStageAnsUrl.ontouchend = function () {				
					game.assets[clickSndUrl].clone().play();
					gstate = 0;				//無限にゲーム画面が読み込まれない様にする.
					FeedbackLebel = 1;
				};
			}

			if (FeedbackLebel == 1 && gstate == 0) {
				game.popScene();
				const firstFeedbackScene = new Scene();
				game.pushScene(firstFeedbackScene);
				firstFeedbackScene.backgroundColor = "black";

				//特定完了メッセージ.
				const findMassage = new Label();
				findMassage.font = "20px 'Russo One', sans-serif";
				findMassage.color = 'rgba(255,0,0,1)';
				findMassage.backgroundColor = 'rgba(0,0,0,1)';
				findMassage.width = 250;
				findMassage.moveTo(60, 65);
				firstFeedbackScene.addChild(findMassage);
				findMassage.text = "[特定完了]";

				//フィードバック.
				const firstFeedbackText = new Label();
				firstFeedbackText.font = "13px 'Russo One', sans-serif";
				firstFeedbackText.color = 'rgba(255,255,255,1)';
				firstFeedbackText.width = 250;
				firstFeedbackText.moveTo(5, 100);
				firstFeedbackScene.addChild(firstFeedbackText);
				firstFeedbackText.text = "西日暮里店ですね。<br>上出来です。";

				//次へ行く画像.
				const videoUrl = new Sprite(30, 30);				//画像サイズ.
				videoUrl.moveTo(95, 150);
				videoUrl.image = game.assets[videoImgUrl];			//事前にロードしておいた画像を読み込む.
				firstFeedbackScene.addChild(videoUrl);
				videoUrl.ontouchend = function () {				
					game.assets[clickSndUrl].clone().play();
					gstate = 2;
					FeedbackLebel = 0;
				};

			}
			if (gstate == 2) {
				//ゲームシーンを新たに作り、第二ステージを開始する.
				game.popScene();						//ゲームシーンを外す.
				const secondScene = new Scene();
				game.pushScene(secondScene);			//シーンを挿入する.
				secondScene.backgroundColor = "black";

				//第二ステージ画像
				const secondStageUrl = new Sprite(214, 430);				//画像サイズ.
				secondStageUrl.moveTo(0, 0);
				secondStageUrl.image = game.assets[secondStageImgUrl];			//事前にロードしておいた画像を読み込む.
				secondScene.addChild(secondStageUrl);

				//第二ステージページ遷移用画像.
				const secondStageAnsUrl = new Sprite(15, 50);				//画像サイズ.
				secondStageAnsUrl.moveTo(0, 380);
				secondStageAnsUrl.image = game.assets[secondStageAnsImgUrl];			//事前にロードしておいた画像を読み込む.
				secondScene.addChild(secondStageAnsUrl);
				secondStageAnsUrl.ontouchend = function () {
					game.assets[clickSndUrl].clone().play();
					gstate = 0;				//無限にゲーム画面が読み込まれない様にする.
					FeedbackLebel = 2;
				};

			}
			if (FeedbackLebel == 2 && gstate == 0) {
				game.popScene();
				const secondFeedbackScene = new Scene();
				game.pushScene(secondFeedbackScene);
				secondFeedbackScene.backgroundColor = "black";

				//特定完了メッセージ.
				const findMassage = new Label();
				findMassage.font = "20px 'Russo One', sans-serif";
				findMassage.color = 'rgba(255,0,0,1)';
				findMassage.backgroundColor = 'rgba(0,0,0,1)';
				findMassage.width = 250;
				findMassage.moveTo(60, 65);
				secondFeedbackScene.addChild(findMassage);
				findMassage.text = "[特定完了]";

				//フィードバック.
				const secondFeedbackText = new Label();
				secondFeedbackText.font = "13px 'Russo One', sans-serif";
				secondFeedbackText.color = 'rgba(255,255,255,1)';
				secondFeedbackText.width = 250;
				secondFeedbackText.moveTo(5, 100);
				secondFeedbackScene.addChild(secondFeedbackText);
				secondFeedbackText.text = "新宿とはとバス近くですね。<br>上出来です。";

				const videoUrl = new Sprite(30, 30);				//画像サイズ.
				videoUrl.moveTo(95, 150);
				videoUrl.image = game.assets[videoImgUrl];			//事前にロードしておいた画像を読み込む.
				secondFeedbackScene.addChild(videoUrl);
				videoUrl.ontouchend = function () {				
					game.assets[clickSndUrl].clone().play();
					gstate = 999;
					FeedbackLebel = 0;
				};

			}

			if (gstate == 999) {
				game.popScene();						//ゲームシーンを外す.
				const finalScene = new Scene();
				game.pushScene(finalScene);			//シーンを挿入する.
				finalScene.backgroundColor = "black";

				const finalSceneText = new Label();
				finalSceneText.font = "13px 'Russo One', sans-serif";
				finalSceneText.color = 'rgba(255,255,255,1)';
				finalSceneText.width = 250;
				finalSceneText.moveTo(5, 100);
				finalScene.addChild(finalSceneText);
				finalSceneText.text = "もう画像が送られてこない。<br>今日はこれで終わりの様だ。<br><br>制作者:F22BA092<br>お菓子大好き。";
			}
		}
	};
	game.start();
};