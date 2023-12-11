# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

# ポイント:

useState フックを使用して、todos（ToDo一覧）と newTodo（新しいToDoを入力するための変数）のステートを定義しています。
useEffect フックを使用して、初回レンダリング時に fetchTodos 関数を呼び出し、ToDo一覧を取得します。
fetchTodos 関数は、fetch 関数を使用してAPI GatewayからToDo一覧を取得し、取得したデータを setTodos でステートにセットします。
addTodo 関数は、新しいToDoをAPI Gatewayに追加するために fetch 関数を使用します。その後、新しいToDoが追加された後に最新のToDo一覧を再取得します。
JSX内では、todos 配列をマップしてToDo一覧を表示し、新しいToDoを入力するための入力欄とボタンを提供しています。