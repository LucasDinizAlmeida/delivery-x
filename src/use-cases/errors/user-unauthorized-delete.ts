export class UserUnauthorizedDelete extends Error {
  constructor() {
    super('unauthorized delete this user')
  }
}
