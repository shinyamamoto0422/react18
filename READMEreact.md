React18

メジャーver
自動バッチ処理などのすぐに使える改善
startTransitionなどの新しいAPI
Suspenseのサポートによるストリーミングサーバーサイドレンダリング

conncurrent React
同時実行 レンダリングが中断可能 再利用可能なステート
講座のメモです https://course-lp.vercel.app/
https://www.udemy.com/course/react18-suspense/

Automatic Batching

マウントとは
描画 一番最初にコンポーネントが初期化され、DOMが描写され、その後のフックが呼び出される一連の流れのこと

ちなみに、レンダーとは
renderメソッドが呼び出され、ブラウザにDOMが描写されること。 関数コンポーネントでは、returnされたJSXがDOMとしてブラウザに描写されること ここでは、stateの初期化・再計算などは含まない

バッチ処理とは
複数のstateを更新するときなど、レンダリングが重なる時に、それぞれのstateごとにレンダリングをするのではなく、まとめてレンダリングをすることで、パフォーマンス向上を図る処理

strictModeでの挙動
開発者モードで行われる。 マウント→アンマウント→マウントすることで、予期しないバグがないかを確認する

変化
17→非同期処理など、イベントハンドラー外ではBatchingされない
18→イベントハンドラー外でも行われる（promiseやsetTimeoutなど）
コード
// React17では、イベントのみのBatch。
const clickHandler = () => {
  setUsers(res.data);
  setFetchCount((fetchCount) => fetchCount + 1);
};
// React18では、Promise や setTimeout は Batch される。
const clickHandler = () => {
  axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
    setUsers(res.data);
    setFetchCount((fetchCount) => fetchCount + 1);
  });
};
Batch を off にしたい場合 flushSync(() => { ~~~ })で囲めばoffになる
import { flushSync } from "react-dom";

const clickHandler = () => {
  flushSync(() => {
    setUsers(res.data);
  });
  flushSync(() => {
    setFetchCount((count) => count + 1);
  });
};

Suspense
状態のハンドリングをしてくれる様になった コンポーネントの設計がシンプルになる
17
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>Error</p>
18
に渡したものをdata fetching中に表示する
<ErrorBoundary
  fallback={
    <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
  }
>
  <Suspense fallback={<Spinner />}>
    <FetchUsers />
    <FetchTasks />
    <FetchComments />
  </Suspense>
</ErrorBoundary>

Nested Suspense
Suspense をネストしている場合、 FooComponent → BarComponent の順番で読み込まれる 表示されるスケルトンは、常に一個だけ
const NestedSuspense = () => {
  return (
    <Layout>
      <p className="mb-3 text-xl font-bold text-blue-500">Nested Suspense</p>
      <Suspense
        fallback={
          <>
            <p className="my-5 text-green-500">Showing outer skelton...</p>
            <Spinner />
          </>
        }
      >
        <FooComponent />
        <Suspense
          fallback={
            <>
              <p className="my-5 text-pink-500">Showing inner skelton...</p>
              <Spinner />
            </>
          }
        >
          <BarComponent />
        </Suspense>
      </Suspense>
    </Layout>
  );
};

トランジション
React の新しい概念で、緊急の更新と緊急でない更新を区別するために使用されます。
緊急の更新→タイピング、クリック、プレスなどの直接的なインタラクションを反映します。 17 複数のstateの更新において優先順位をつけることはできなかった 18 緊急性の高いstateとそうでないstateの優先づけができる
重いstateの更新・重たい処理に割り込みを入れて、先に緊急性の高いstateの更新を完了させることができる

例
input→優先度の高いstate
searchKey →そうでないstateでinputに入力すると、updateHandlerという重い処理が走る
そこで、useTransitionを使う
優先度の高いstate・低いstateを別々のuseStateに保持する
const [isPending, startTransition] = useTransition()を定義
ispending→両者のラグをtrue falseで表せる
優先度の低い方を startTransition で囲む
startTransition(() => setSearchKey(e.target.value))
高い方は普通に、state更新
import { useState, useTransition } from 'react'

const [input, setInput] = useState('') //urgent state update
const [searchKey, setSearchKey] = useState('') // not urgent state update
const [isPending, startTransition] = useTransition() ←これ！

const updateHandler = (e) => {
  setInput(e.target.value)
  startTransition(() => setSearchKey(e.target.value))
}

userId
ハイドレーション時の不整合を防ぎつつ、クライアントとサーバーで一意なIDを生成するためのhook

その他

staleTime
キャッシュされたデータをどのくらいの期間最新のものとみなすか

promise object
三つの状態をもつ
pending　未確定の状態
fulfilled 確定　成功
rejected 確定　失敗
await delay(3000) 流れ
最初にpending状態のpromiseオブジェクトを返す
await確定状態になるまで待つ
約3秒後にresolve()が実行されて、fullfilledになる
export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
