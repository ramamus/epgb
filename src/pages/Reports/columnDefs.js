export const columnDefs = () => {
  return [
    {
      headerName: 'Report',
      children: [
        {
          headerName: 'First Name',
          field: 'firstname',
          colId: 'firstname',
          width: 150
        },
        {
          headerName: 'Last Name',
          field: 'lastname',
          colId: 'lastname',
          width: 150
        },
        {
          headerName: 'Grade',
          field: 'grade',
          colId: 'grade',
          sortable: true,
          filter: true,
          width: 100
        },
        {
          headerName: 'Team',
          field: 'team',
          colId: 'team',
          sortable: true,
          filter: true,
          width: 100
        },
        {
          headerName: 'Plays For',
          field: 'belongto',
          colId: 'belongto',
          sortable: true,
          filter: true,
          width: 200
        },
        {
          headerName: 'CheckedIn',
          field: 'checkedin',
          colId: 'checkedin',
          sortable: true,
          filter: true,
          width: 200
        }
      ]
    }
  ];
};
