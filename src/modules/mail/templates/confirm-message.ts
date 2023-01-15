export const confirmMessage = (dto) => `
<main>
  Доброго дня, ${dto.user}!<br />
  От Вас поступила регистрация на сайте post-life.
  <br />
  Для окончания регистрации пройдите пожалуйста по
  <a href="http://localhost:8080/api/base/activate/${dto.link}">ссылке</a>.
</main>
`;
