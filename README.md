# React18

## メジャー ver

- 自動バッチ処理などのすぐに使える改善
- startTransition などの新しい API
- Suspense のサポートによるストリーミングサーバーサイドレンダリング

## conncurrent React

同時実行 レンダリングが中断可能 再利用可能なステート

講座のメモです https://course-lp.vercel.app/
https://www.udemy.com/course/react18-suspense/

# Automatic Batching

## マウントとは

描画 一番最初にコンポーネントが初期化され、DOM が描写され、その後のフックが呼び出される一連の流れのこと

## ちなみに、レンダーとは

render メソッドが呼び出され、ブラウザに DOM が描写されること。 関数コンポーネントでは、return された JSX が DOM としてブラウザに描写されること ここでは、state の初期化・再計算などは含まない

## バッチ処理とは

複数の state を更新するときなど、レンダリングが重なる時に、それぞれの state ごとにレンダリングをするのではなく、まとめてレンダリングをすることで、パフォーマンス向上を図る処理

# strictMode での挙動

開発者モードで行われる。 マウント → アンマウント → マウントすることで、予期しないバグがないかを確認する

### 変化

- 17→ 非同期処理など、イベントハンドラー外では Batching されない
- 18→ イベントハンドラー外でも行われる（promise や setTimeout など）

コード

```javascript
// React17では、イベントのみのBatch。
const clickHandler = () => {
  setUsers(res.data)
  setFetchCount((fetchCount) => fetchCount + 1)
}
// React18では、Promise や setTimeout は Batch される。
const clickHandler = () => {
  axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
    setUsers(res.data)
    setFetchCount((fetchCount) => fetchCount + 1)
  })
}
```

Batch を off にしたい場合 `flushSync(() => { ~~~ })`で囲めば off になる

```javascript
import { flushSync } from 'react-dom'

const clickHandler = () => {
  flushSync(() => {
    setUsers(res.data)
  })
  flushSync(() => {
    setFetchCount((count) => count + 1)
  })
}
```

# Suspense

状態のハンドリングをしてくれる様になった コンポーネントの設計がシンプルになる
17

```javascript
if (status === 'loading') return <p>Loading...</p>
if (status === 'error') return <p>Error</p>
```

18
に渡したものを data fetching 中に表示する

```javascript
<ErrorBoundary fallback={<ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />}>
  <Suspense fallback={<Spinner />}>
    <FetchUsers />
    <FetchTasks />
    <FetchComments />
  </Suspense>
</ErrorBoundary>
```

# Nested Suspense

Suspense をネストしている場合、 FooComponent → BarComponent の順番で読み込まれる 表示されるスケルトンは、常に一個だけ

```javascript
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
  )
}
```

# トランジション

React の新しい概念で、緊急の更新と緊急でない更新を区別するために使用されます。
緊急の更新 → タイピング、クリック、プレスなどの直接的なインタラクションを反映します。 17 複数の state の更新において優先順位をつけることはできなかった 18 緊急性の高い state とそうでない state の優先づけができる
重い state の更新・重たい処理に割り込みを入れて、先に緊急性の高い state の更新を完了させることができる

例
input→ 優先度の高い state
searchKey → そうでない state で input に入力すると、updateHandler という重い処理が走る
そこで、useTransition を使う
優先度の高い state・低い state を別々の useState に保持する
const [isPending, startTransition] = useTransition()を定義
ispending→ 両者のラグを true false で表せる
優先度の低い方を startTransition で囲む
startTransition(() => setSearchKey(e.target.value))
高い方は普通に、state 更新

```javascript
import { useState, useTransition } from 'react'

const [input, setInput] = useState('') //urgent state update
const [searchKey, setSearchKey] = useState('') // not urgent state update
const [isPending, startTransition] = useTransition() ←これ！

const updateHandler = (e) => {
  setInput(e.target.value)
  startTransition(() => setSearchKey(e.target.value))
}
```

# useId

ハイドレーション時の不整合を防ぎつつ、クライアントとサーバーで一意な ID を生成するための hook

# その他

## staleTime

キャッシュされたデータをどのくらいの期間最新のものとみなすか

## promise object

三つの状態をもつ
pending 　未確定の状態
fulfilled 確定　成功
rejected 確定　失敗
await delay(3000) 流れ
最初に pending 状態の promise オブジェクトを返す
await 確定状態になるまで待つ
約 3 秒後に resolve()が実行されて、fullfilled になる

```javascript
export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
```
