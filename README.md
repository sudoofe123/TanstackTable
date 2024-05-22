## Admin Dashboard with Book Records

This project is an admin dashboard for displaying book records. The data is fetched from the OpenLibrary API. The dashboard includes features like pagination, sorting, searching by author, CSV export, and displays a "No data found" message when no search results are available.

### Features

- **Pagination**: Navigate through pages of book records with customizable page sizes.
- **Sorting**: Sort data in ascending or descending order on all columns.
- **Search**: Search books by author name.
- **CSV Export**: Export the current view of book records to a CSV file.
- **Loading and No Data States**: Display loading spinner during data fetch and a message when no data matches the search criteria.

### Technology Stack

- **Frontend**: React.js
- **UI Framework**: TanStack Table (formerly React Table)
- **Data Fetching**: Fetch API
- **CSV Export**: react-csv

### Getting Started

#### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
