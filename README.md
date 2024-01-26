# HahnApp
Overview
This project is a comprehensive web application integrating Angular with ASP.NET Core and SQL Server, employing Clean Architecture for efficient and maintainable code structure. We leverage Entity Framework, Identity Framework, and Unit of Work alongside Mediator patterns to ensure a robust, scalable backend. Key features include JWT-based authentication with refresh tokens, a detailed user profile page, and extensive CRUD operations for user and role management, underpinned by secure ASP.NET authorization.

Features
Achieved Tasks
User Authentication: Implementing JWT for secure login, including refresh tokens on expiration.
User Profile Management: Enabling users to view and edit their profile information, including profile picture updates.
User and Role CRUD Operations: Comprehensive Create, Read, Update, and Delete functionalities for users and roles.
Role Management: Assigning roles to users and managing role permissions (addition and removal).
Database Seeding: Initial data setup for application testing and development purposes.
Secure Endpoints: Protecting API endpoints using ASP.NET authorization.
Real-Time Chat Backend: Integration of SignalR for real-time communication (backend implementation).
Route Protection in Angular: Implementing AuthGuard for securing Angular routes based on authentication status.
Pending Tasks
Front-End Chat Application: Completion of the front-end integration for the SignalR chat.
Conditional Rendering Based on Permissions: Enhancing the UI to render pages and features dynamically based on user permissions.
Technologies Used
Front-End: Angular
Back-End: ASP.NET Core
Database: SQL Server
Authentication: JWT, Entity Framework Identity
Architecture: Clean Architecture
Patterns: Unit of Work, Mediator
Real-Time Communication: SignalR (Backend)
Authorization: ASP.NET Authorization
Other: Entity Framework
Getting Started
Prerequisites
.NET Core SDK
SQL Server
Node.js and Angular CLI
Installation
Clone the Repository: git clone [https://github.com/EssaadaouiMohamed/HahnApp.git]
Database Setup: Configure SQL Server and update connection strings in appsettings.json.
Backend Setup: Navigate to the ASP.NET Core project directory and run dotnet restore followed by dotnet run.
Frontend Setup: Navigate to the Angular project directory and run npm install followed by ng serve.
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Your Name - [mohamedessaadaoui02@example.com]

Project Link: [https://github.com/EssaadaouiMohamed/HahnApp]
