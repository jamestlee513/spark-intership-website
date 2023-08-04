/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = async (event) => {
  // allowed domains using regex /^.+\.edu$/i
  const ald = /^.+\.edu$/i;

  const { email } = event.request.userAttributes;
  const domain = email.substring(email.indexOf('@') + 1);

  if (!ald.test(domain)) {
    throw new Error(`Invalid email domain: ${domain}`);
  }

  return event;
};
