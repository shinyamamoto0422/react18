import { useState } from 'react'
import { FC, useId } from 'react'
import { Layout } from '../Layout/Layout'

type Props = {
  title: string
  placeholder: string
  inputProps?: React.ComponentPropsWithoutRef<'input'>
  errorMessage?: '正しく入力してください！！'
}

const TextBox: FC<Props> = ({ title, placeholder, inputProps, errorMessage }: Props) => {
  const errorMessageId = useId() // todo: これ！！
  const [inputCondition, setInputCondition] = useState<boolean>(true)
  // okを押したときに、inputに何も入ってなかったら、エラーを出す
  const onClickOk = () => {
    if (inputCondition) {
      setInputCondition(false)
    }
  }
  return (
    <>
      <label>
        <p>{title}</p>
        <input
          {...inputProps}
          type="text"
          aria-aria-invalid={!!errorMessage}
          aria-errorMessage={errorMessageId} // todo: これ！
          className="mb-5 rounded border border-gray-500 px-3 py-1 text-sm"
          placeholder={placeholder}
          title={title}
          onChange={() => setInputCondition(true)}
        />
        {inputCondition && (
          <p id={errorMessageId} className="my-3 text-xl font-bold text-pink-300">
            {errorMessage}
          </p>
        )}
      </label>
      <button
        onClick={onClickOk}
        className="my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
      >
        OK
      </button>

      <p>{inputCondition}</p>
    </>
  )
}

export const UserId = () => {
  return (
    <Layout>
      <p className="my-3 text-xl font-bold text-blue-500">userid</p>
      <TextBox title="お名前" placeholder="入力してください" />
    </Layout>
  )
}
