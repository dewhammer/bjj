# Add Program Detail Pages

## Description
This PR adds detailed view pages for each training program, allowing users to view more comprehensive information about each program before deciding to enroll. It enhances the user experience by providing more detailed descriptions, schedules, instructor information, and pricing details in a dedicated page for each program.

## Changes
- Created a new `ProgramDetail.tsx` component that displays full details of a specific program
- Added a new route in `App.tsx` to handle program detail paths (`/programs/:programId`)
- Updated the `ProductCard` component to include a "View Details" button that links to the program detail page
- Created a `NotFound.tsx` component to handle 404 errors for non-existent routes
- Enhanced program data with additional fields like long descriptions, schedules, and instructor information

## Technical Details
- Uses React Router's dynamic routing with URL parameters to determine which program to display
- Implements a responsive design with a two-column layout on desktop and a single column on mobile
- Preserves the existing checkout functionality while enhancing the browsing experience
- Maintains design consistency with the rest of the application using glassmorphic UI elements

## Screenshots
[Add screenshots of the new program detail pages]

## Testing Instructions
1. Navigate to the Programs page
2. Click on the "View Details" button for any program
3. Verify that the program detail page displays all the expected information
4. Test the navigation between programs, going back to all programs, and the checkout functionality
5. Test on mobile and desktop devices to ensure responsive design works properly

## Notes
Additional program-specific content (longer descriptions, schedules, etc.) should be updated with real data before deploying to production. 