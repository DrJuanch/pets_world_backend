async function existDB(id, model){
  const exist = await model.exists({_id: id});
  return exist
}

const ERROR_RESPONSES = Object.freeze({
  invalid: 'INVALID INFORMATION',
  not_found: 'NOT FOUND',
  intern: 'INTERN ERROR',
  unexpected: 'UNEXPECTED ERROR',
  check: 'Check the id or already deleted',
  check_token: "You can't pass from here",
  expired_token: 'Your code has expired',
  blocked: 'User blocked',
  weak_password: 'Password should have at least one uppercase and one number',
  just_letters: 'Just insert letters'
});

module.exports = {
  ERROR_RESPONSES,
  existDB
}
