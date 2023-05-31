
class BackendPaths {
    ROOT = process.env.REACT_APP_API_URL
    COMMITTEE = this.ROOT + '/committee'
    EMPLOYEE = this.ROOT + '/employee'
    MEMBERSHIP = this.ROOT + '/membership'

    COMMITTEE_ALL = this.COMMITTEE + '/all' // In committee, '/all' will return all the committees registerd in the database.
    COMMITTEE_OPTIONS = this.COMMITTEE + '/options' // In member and committee, '/options' will return a list with the names of all registered components of that class.

    EMPLOYEE_HISTORY = this.EMPLOYEE + '/history' // EMPLOYEE_HISTORY will return all members with all related member_on_committee instances.
    EMPLOYEE_OPTIONS = this.EMPLOYEE + '/options' 
}
export default new BackendPaths()
  