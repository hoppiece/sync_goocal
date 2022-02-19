# sync_goocal

## 概要

カレンダーA のイベントをフィルタして カレンダーB にコピーするためのスクリプト.

次のようなケース

- 組織で複数人で Google Calendar を使って予定を共有している
- 自分に関係のない予定が表示されるのでカレンダーが見にくい. でも自分に関係する予定は表示させたい

ような場合に

- 組織のカレンダーから自分の名前など, 特定のキーワードを含むイベントのみを抽出して, 別のカレンダーにコピー
- 組織のカレンダーに新たにイベントが追加されたら, 随時コピーを実施


する機能を実現する.
具体的には, [`code.gs`](https://github.com/hoppiece/sync_goocal/blob/main/code.gs) の必要箇所を書き換えて 自分の Drive の GAS に書き, 定時実行のトリガーを設定する.

## How to run

1. Google Drive のトップ画面から, 新規 Google Apps Script プロジェクトを作成

<img width="800" alt="スクリーンショット 2022-02-19 22 50 38" src="https://user-images.githubusercontent.com/38513250/154803650-56bc91f9-2113-429f-9bc0-471d389ae2ab.png">

作成したら開いて適宜プロジェクトに名前をつける

2. `コード.gs` に, [code.gs](https://github.com/hoppiece/sync_goocal/blob/main/code.gs) の内容をコピペ. コメントの内容に従って, 調べたカレンダーID と フィルタするために設定したいキーワードを書き換える.

<img width="800" alt="スクリーンショット 2022-02-19 22 56 55" src="https://user-images.githubusercontent.com/38513250/154803922-fd8750ba-fba3-4760-9f3a-498f74566677.png">

3. GAS 画面の左のメニューのトリガー(時計のマーク) から, 定時実行の設定をする. 「トリガーを追加」から一定時間おきにコード内の関数が実行されるように設定.
<img width="800" alt="スクリーンショット 2022-02-19 23 02 32" src="https://user-images.githubusercontent.com/38513250/154804065-89f4431d-fa50-4406-805a-40bf568d8392.png"> 
GASによるカレンダーの新規イベント作成は5000回/日が上限であることに留意して定時実行すること.


## Comment
- 同期ではなくコピーなので, コピー元のカレンダーの変更・削除を反映しない. 要望があれば対応するかも
