interface Report {
    new: 'new' | 'in_progress' | 'done',
    date: string,
    licenseNumber: string,
    color: string,
    type: "sport" | "general",
    ownerFullName: string,
    officer: string,
    createdAt: string,
    updateAt: string,
    clientId: string,
    description: string,
    resolution: string // not required, only if 'new' status is 'done'
}
  
export default Report;