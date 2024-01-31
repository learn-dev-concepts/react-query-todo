# 구성

홈과 디테일 페이지로 이루어져있습니다.

1. 홈에서는 목록을 불러오고 목록에 새로운 투두를 추가합니다. (옵티미스틱 업데이트 예제)
2. 디테일에서는 id에 맞는 투두를 불러오고 서버 상태를 mutation하는 예제가 있습니다.

<br />

# 옵티미스틱 업데이트 참고
옵티미스틱 업데이트를 위해서 addPost라는 메소드에서 예외를 발생시킵니다.
onClickAdd 함수에서 항상 id가 10인 더미 투두를 생성하고 추가를 요청합니다.
db.json 파일에 id가 10인 todo가 있다면 예외를 발생시키고 없다면 추가를 합니다.
예외를 통해서 옵티미스틱 업데이트가 잘 작동하는지 확인 가능합니다. (ui에서 보엿다가 예외 발생시 사라짐)<br />

공식홈페이지의 예제를 따라 커밋이 남겨져있습니다.<br />
https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates <br />
- ui를 사용하는 사용
- useMutationState 사용
- cache사용

<br />

# useQuery에 동적으로 매개변수 전달
디테일 페이지에서 강제로 id를 동적으로 업데이트하는 시나리오를 작성해서 id가 없을 때는 쿼리가 작동하지 않고
id가 추가될 때만 쿼리가 작동하게 하는 예제를 구현했습니다.

1. enabled 를 사용해서 id가 없는 경우에는 작동하지 않도록 구현
2. queryKey 배열의 2번째 요소로 id를 전달하고 queryFn의 인자에서 context.query를 통해서 해당 id를 추출합니다. 그리고 id가 undefined라면 쿼리를 실행하지 않고 값이 잇을 때만 실행하도록 분기처리합니다.
