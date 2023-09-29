import { Either, Left, Right, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

test('sucess result', () => {
  const result = doSomething(true)

  if (result.isRight()) {
    console.log(result.value)
  }

  expect(result).toBeInstanceOf(Right)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result).toBeInstanceOf(Left)
})
