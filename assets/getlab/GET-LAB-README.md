# GetLab - Lab Equipment Management System

## 📋 Overview
GetLab is a comprehensive Windows Forms application designed to manage laboratory equipment reservations and operations for Cairo University. The system provides role-based access for Students, Professors, and Lab Assistants, enabling efficient management of equipment checkouts, lab reservations, maintenance tracking, and administrative tasks.

## 🎯 Project Scope
This application serves as a complete lab management solution for educational institutions, handling equipment inventory, reservations, maintenance tracking, and usage statistics. Built as a final project for CMPS202 - Database Systems course at Cairo University.

## 👥 User Roles & Features

### **Student Portal**
- Browse and search available equipment
- Reserve equipment for lab use or take-home
- View equipment specifications and availability
- Track personal reservations and history
- Submit maintenance reports for damaged equipment
- Cancel or extend reservations

### **Professor Portal**
- Request new equipment with justification
- Submit maintenance reports for damaged equipment
- Reserve entire labs for classes/research
- View lab availability and schedules
- Track personal equipment requests
- Access to specialized reporting features

### **Lab Assistant/Admin Portal**
- Process equipment returns and check-ins
- Manage equipment inventory (Add/Edit/Delete)
- Approve or deny equipment requests
- Track equipment status and conditions
- View maintenance reports and update equipment status
- Manage locations (labs and storage rooms)
- Generate usage statistics and analytics
- View most reserved equipment
- Monitor equipment status distribution

## Technology Stack

**Frontend**
- C# Windows Forms (.NET Framework 4.8)
- System.Windows.Forms.DataVisualization for charts

**Backend**
- SQL Server (Database Engine)
- ADO.NET for data access
- Stored Procedures for all database operations

**Security**
- SHA-256 password hashing
- Parameterized queries for SQL injection prevention
- Role-based access control

## Architecture

### 3-Tier Architecture
1. **Presentation Layer** (Forms/) - Windows Forms UI
2. **Business Logic Layer** (Controller/) - Application logic
3. **Data Access Layer** (Data/) - Database operations

### Key Components

**DBManager.cs**: Centralized database connection and command execution
- `ExecuteReader()` - Returns DataTable for SELECT queries
- `ExecuteNonQuery()` - For INSERT/UPDATE/DELETE operations
- `ExecuteScalar()` - For single value returns

**SecurityHelper.cs**: SHA-256 password hashing

**Controller.cs**: Business logic layer with 30+ methods for all operations

## Features by User Role

### Students
- View available equipment and labs
- Reserve equipment for specific time slots
- Request equipment for take-home use
- View personal reservation history
- Submit maintenance reports for damaged equipment
- Cancel reservations

### Professors/Teachers
- Reserve entire lab rooms for classes
- Request new equipment purchases
- View and manage course-related equipment requests
- Submit equipment maintenance reports
- View lab availability schedule

### Lab Assistants (Admin)
- Process equipment returns
- Manage equipment inventory (add, edit, remove)
- Approve/deny equipment requests
- View system statistics and reports
- Track equipment maintenance
- Manage lab locations and availability
- Generate usage statistics

## Key Features

### Equipment Management
- Add new equipment with supplier tracking
- Track equipment status (Available, Borrowed, Reserved, Maintenance, Lost)
- Serial number tracking
- Location management (Labs and Storage)

### Reservation System
- **Hourly slots**: Students can reserve equipment for specific time slots
- **Daily reservations**: Take-home equipment for extended periods
- **Lab room booking**: Professors can reserve entire labs
- Conflict prevention for overlapping reservations

### User Roles & Capabilities
- **Students**: Reserve equipment, view their reservations, submit maintenance reports
- **Professors**: Request equipment, reserve labs, view lab availability, submit reports
- **Lab Assistants**: Manage all equipment, approve returns, view statistics, add equipment

### Security Features
- SHA-256 password hashing
- Role-based access control
- SQL injection prevention via stored procedures
- Parameterized queries

## Development Information

### Architecture
- **Presentation Layer**: Windows Forms (UI)
- **Business Logic Layer**: Controller classes
- **Data Access Layer**: DBManager + SecurityHelper
- **Database**: SQL Server with stored procedures

### Key Components
- **DBManager**: Handles all database operations
- **SecurityHelper**: SHA-256 password hashing
- **Controller**: Business logic layer bridging UI and data
- **BaseForm**: Shared form functionality for consistent UI

## Prerequisites
- Visual Studio 2019 or later
- .NET Framework 4.8
- SQL Server 2019 or later (Express edition works fine)
- SQL Server Management Studio (SSMS)

## Installation

### 1. Database Setup
```sql
-- Open SQL Server Management Studio
-- Connect to your instance
-- Open DatabaseScripts/00_Master_Setup.sql
-- Execute (F5)
```

### 2. Configure Connection String
Edit `App.config` to match your SQL Server instance:
```xml
<connectionStrings>
    <add name="GetLabConnection"
         connectionString="Data Source=YOUR_SERVER;Initial Catalog=GetLabDB;Integrated Security=True;"
         providerName="System.Data.SqlClient" />
</connectionStrings>
```

### 3. Build and Run
1. Open `GetLab.sln` in Visual Studio 2019 or later
2. Build the solution (Ctrl+Shift+B)
3. Run the application (F5)

## Key Features by Role

### 🎓 Student Features
- **Browse Equipment**: View all available equipment with real-time status
- **Make Reservations**: Reserve equipment for lab sessions or take-home use
- **View Reservations**: Track current and past reservations
- **Submit Reports**: Report damaged or malfunctioning equipment
- **Time Slot System**: Reserve equipment for specific hourly slots

### 👨‍🏫 Professor Features
- **Request Equipment**: Submit requests for new equipment with justification
- **Reserve Labs**: Book entire lab rooms for classes
- **View Labs**: Check lab availability and status
- **Submit Maintenance Reports**: Report equipment issues
- **My Requests**: Track status of equipment requests

### 🛠️ Lab Assistant Features
- **Equipment Management**: Add, update, and remove equipment
- **Return Processing**: Handle equipment returns with condition assessment
- **Maintenance**: Mark equipment for maintenance and track reports
- **Statistics Dashboard**: View equipment usage patterns and status
- **Request Management**: Approve or deny equipment requests from professors
- **Location Management**: Manage lab rooms and storage facilities

## Key Features

### 🔐 Security
- SHA-256 password hashing
- Role-based access control (RBAC)
- Secure database connections via stored procedures

### 📊 Statistics & Reporting
- Most reserved equipment tracking
- Equipment status distribution
- Usage analytics for informed decision-making

### ⏰ Time Slot Management
- Hourly equipment reservations
- Lab room bookings for professors
- Conflict detection and prevention

### 🔧 Maintenance Tracking
- Equipment condition reporting
- Maintenance status tracking
- Issue resolution workflow

## Technology Stack

**Frontend:**
- C# Windows Forms (.NET Framework 4.8)
- System.Windows.Forms.DataVisualization for charts
- Custom form inheritance (BaseForm)

**Backend:**
- SQL Server 2019+ with stored procedures
- ADO.NET for database access
- ConfigurationManager for connection management

**Architecture:**
- 3-Tier Architecture:
  - **Presentation Layer**: Windows Forms (Forms/)
  - **Business Logic Layer**: Controller (Controller/)
  - **Data Access Layer**: DBManager (Data/)

**Security:**
- SHA-256 cryptographic hashing
- Parameterized SQL queries (injection prevention)
- Integrated Windows Authentication support

## Prerequisites

- Visual Studio 2019 or later
- .NET Framework 4.8
- SQL Server 2019 or later (Express edition works)
- Windows OS (Windows Forms application)

## Installation & Setup

### 1. Database Setup

1. Open SQL Server Management Studio (SSMS)
2. Connect to your SQL Server instance
3. Navigate to `DatabaseScripts/00_Master_Setup.sql`
4. Execute the script (F5)

The script will:
- Create `GetLabDB` database
- Set up 9 tables with relationships
- Create 30+ stored procedures
- Insert sample test data

**Execution time:** ~30 seconds

### 2. Configure Connection String

1. Open `App.config`
2. Update the connection string with your SQL Server details:

```xml
<connectionStrings>
  <add name="GetLabConnection"
       connectionString="Data Source=YOUR_SERVER_NAME;Initial Catalog=GetLabDB;Integrated Security=True;"
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

Replace `YOUR_SERVER_NAME` with:
- `localhost` or `.` for local SQL Server
- `.\SQLEXPRESS` for SQL Server Express
- Your server name/IP for remote connections

### 3. Build and Run

1. Open `GetLab.sln` in Visual Studio
2. Build the solution (Ctrl+Shift+B)
3. Run the project (F5)
4. Login using test credentials

## Test Credentials

All test accounts use password: **1234**

| Role | University ID | Description |
|------|--------------|-------------|
| **Lab Assistant** | ADM001 | Full administrative access |
| **Student** | 4230175 | Primary student account |
| **Student** | 1230256 | Secondary student account |
| **Professor** | PROF01 | Faculty member access |

## Project Structure

```
GetLab/
├── Forms/                          # UI Layer (Windows Forms)
│   ├── Authentication/             # Login & Registration
│   │   ├── login.cs                # Login form
│   │   └── Create.cs               # User registration
│   ├── Student/                    # Student features
│   │   ├── Welcome_student.cs      # Student dashboard
│   │   ├── studentsreservation.cs  # Equipment reservation
│   │   └── MyReservations.cs       # View reservations
│   ├── Professor/                  # Professor features
│   │   ├── Welcome_Professor.cs    # Professor dashboard
│   │   ├── requestEquipment.cs     # Request new equipment
│   │   ├── myRequests.cs           # View equipment requests
│   │   ├── teacherReservation.cs   # Lab room booking
│   │   ├── viewLabs.cs             # View lab availability
│   │   └── submitreport.cs         # Report equipment issues
│   ├── Assistant/                  # Lab assistant features
│   │   ├── Welcome_Assistant.cs    # Assistant dashboard
│   │   ├── AddEquipmentForm.cs     # Add new equipment
│   │   ├── ReturnItemForm.cs       # Process returns
│   │   ├── MaintenanceForm.cs      # Maintenance management
│   │   ├── ManageRequestsForm.cs   # Approve/deny requests
│   │   ├── ManageLocationsForm.cs  # Lab management
│   │   └── StatisticsForm.cs       # Analytics dashboard
│   └── BaseForm.cs                 # Shared form base class
├── Controller/                     # Business Logic Layer
│   └── Controller.cs               # Core business logic
├── Data/                           # Data Access Layer
│   ├── DBManager.cs                # Database operations
│   └── SecurityHelper.cs           # Password hashing
├── Helpers/                        # Utility classes
│   └── FormHelper.cs               # Form navigation helpers
├── Models/                         # Data models (optional)
├── DatabaseScripts/                # SQL setup scripts
│   ├── 00_Master_Setup.sql         # Complete database setup
│   └── README.md                   # Database documentation
├── App.config                      # Configuration file
├── GetLab.csproj                   # Project file
└── GetLab.sln                      # Solution file
```

## Database Schema

### Core Tables

**Users** - User accounts with role-based access
- Supports Students, Professors (Teachers), and Admins (Lab Assistants)

**Equipment** - Lab equipment inventory
- Status: Available, Borrowed, Reserved, Maintenance, Lost

**EquipmentReservations** - Equipment checkout records
- Tracks reservation dates, due dates, and returns

**RoomReservations** - Lab room bookings (Professor feature)

**Locations** - Physical labs and storage rooms

**Suppliers** - Equipment vendor information

**Courses** - Academic courses taught by professors

**MaintenanceReports** - Equipment issue tracking

**EquipmentRequests** - Professor requests for new equipment

### Key Stored Procedures

- `sp_UserLogin` - User authentication
- `sp_RegisterUser` - New user registration
- `sp_GetAvailableEquipment` - Browse equipment
- `sp_ReserveEquipment` - Create reservation
- `sp_ReturnEquipment` - Process equipment return
- `sp_GetMostReservedEquipment` - Usage statistics
- `sp_GetEquipmentStatusCount` - Status analytics
- `sp_RequestEquipment` - Submit equipment request
- `sp_ApproveRequest` / `sp_DenyRequest` - Request management

## Key Features Implementation

### Student Features
- Browse available equipment by category
- Reserve equipment with date/time selection
- View current and past reservations
- Receive alerts for overdue items

### Professor Features
- Request new equipment with justification
- Book entire lab rooms for classes
- View all lab availability
- Submit maintenance reports

### Lab Assistant Features
- Add/edit/remove equipment
- Process equipment returns with condition assessment
- Mark equipment for maintenance
- View statistics and analytics
- Approve/deny equipment requests from professors
- Manage lab locations and capacities

## Development Notes

### Design Patterns Used
- **Repository Pattern**: DBManager abstracts database operations
- **Controller Pattern**: Separates business logic from UI
- **Form Inheritance**: BaseForm provides common functionality
- **Stored Procedure Architecture**: All database operations use SPs

### Security Considerations
- Passwords stored as SHA-256 hashes
- SQL injection prevention via parameterized queries
- Role validation on form access
- No plain-text password storage

### Future Enhancements
- Email notifications for due dates
- Barcode scanning for equipment
- Mobile application
- Online booking portal
- Equipment damage cost tracking
- Fine/penalty system for overdue items

## Troubleshooting

### Database Connection Issues
**Problem:** "Connection string not found" or connection errors

**Solution:**
1. Verify SQL Server is running
2. Check `App.config` connection string
3. Test connection in SSMS with same credentials
4. Ensure GetLabDB database exists

### Login Issues
**Problem:** Cannot login with test credentials

**Solution:**
1. Verify `00_Master_Setup.sql` was executed completely
2. Check Users table in SSMS: `SELECT * FROM Users`
3. Ensure password is `1234` (case-sensitive in SHA-256)

### Build Errors
**Problem:** Missing references or build failures

**Solution:**
1. Clean solution (Build > Clean Solution)
2. Restore NuGet packages (if any)
3. Rebuild solution (Build > Rebuild Solution)
4. Verify .NET Framework 4.8 is installed

## Contributing

This project was developed as part of CMPS202 Database Systems course at Cairo University.

**Developers:**
- Mahmoud Attia ([@mahmouddattiaa](https://github.com/mahmouddattiaa))
- Mariam Raafat

## Course Information

**Course:** CMPS202 - Database Systems  
**Institution:** Cairo University  
**Semester:** Fall 2026  
**Project:** Final Project - Lab Equipment Management System

## License

This project is developed for educational purposes as part of a university course.

## Contact

For questions or issues regarding this project:
- **Repository:** [github.com/mahmouddattiaa/GetLab](https://github.com/mahmouddattiaa/GetLab)
- **Course:** CMPS202 Database Systems, Cairo University

---

**Note:** This is an educational project demonstrating database system design and implementation using C# Windows Forms and SQL Server.
```