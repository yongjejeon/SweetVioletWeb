# Sweet Violet Meal Planner

This project is a Meal Planner Application built using React for the frontend and FastAPI for the backend. The application allows users to input meal preferences and dietary goals to generate a weekly meal plan with nutrition breakdowns.

Link to Wireframe: https://www.figma.com/design/835kS7BAVDMVakyTN0xZQi/Sweet-Violet-Wireframe?node-id=0-1&m=dev&t=XVZpzYJRcE4v3Hvs-1

## Table of Contents
- Project Description
- Component Documentation
- Setup Instructions
- Development Process
- Design Decisions
- Technical Choices
- AI Usage

## Project Description

The Sweet Violet Meal Planner enables users to personalize meal plans based on their preferences. After setting preferences like meal types, dietary restrictions, and health goals, users generate a weekly meal plan that displays the average nutritional values (e.g., calories, carbs, protein, fat) and includes an option to view more detailed nutritional information.

The application includes the following key pages:
- **Preferences Page**: Collects user preferences for meal types, dietary restrictions, health goals, and personal details like weight and height.
- **Meal Plan Page**: Displays a weekly scrollable meal plan with a breakdown of daily meals, total cost estimates, and average nutrition values.
- **Detailed Meal Plan Page**: Provides additional details on daily meals and individual nutritional information.

## Component Documentation

### App.js
- **Description**: Main component that sets up routing for the application and includes global elements like the header.
- **Props**: None
- **State**: None

### Selector.js
- **Description**: Reusable component for selecting multiple or single items (e.g., meal types or health goals).
- **Props**:
  - `options` (array): Array of strings representing the options.
  - `onSelect` (function): Callback function triggered when an option is selected.
  - `multiple` (boolean): If true, allows multiple selections.
- **State**:
  - `selectedOptions` (array): Tracks selected options (if multiple) or a single option.

### Input.js
- **Description**: A reusable input component that accepts various input types and custom labels.
- **Props**:
  - `label` (string): The label displayed above the input field.
  - `type` (string): Specifies the input type, e.g., “text”, “number”.
  - `value` (string): The current value of the input field.
  - `onChange` (function): Callback function triggered when the input value changes.
  - `placeholder` (string): Placeholder text for the input field.
- **State**: None

### Button.js
- **Description**: Reusable button component with custom styling for different actions.
- **Props**:
  - `label` (string): Text displayed on the button.
  - `onClick` (function): Function to be called on button click.
  - `variant` (string): Determines button styling.
- **State**: None

### NutritionOverview.js
- **Description**: Displays a scrollable overview of average daily nutritional values, including calories, carbs, protein, and fat.
- **Props**:
  - `calories` (number): Average daily calorie intake.
  - `carbs` (number): Average daily carbohydrate intake in grams.
  - `protein` (number): Average daily protein intake in grams.
  - `fat` (number): Average daily fat intake in grams.

### DayCard.js
- **Description**: Represents a single day’s meal plan, displaying breakfast, lunch, and dinner details, along with the total price for the day.
- **Props**:
  - `day` (string): The label for the day (e.g., “Day 1”).
  - `meals` (object): Contains meal information with breakfast, lunch, and dinner as properties, each having a name attribute.
  - `totalPrice` (number): The total cost of all meals for the day.

### ActionButtons.js
- **Description**: A reusable component that displays three primary action buttons for managing the meal plan: “Select Meal Plan without Ordering,” “Order Meal Plan,” and “Regenerate.”
- **Props**: None (button actions are handled internally within the component).

### IngredientList.js
- **Description**: A component that displays ingredients in the form of a list, including the price for each ingredient.
- **Props**:
  - `name` (string): Name of the ingredient.
  - `price` (number): Price of the ingredient.

### ArrowButton.js
- **Description**: An image that acts as a button to switch between meal plan days.
- **Props**:
  - `img` (string): Displays image of the arrow button.
  - `onClick` (function): Function called when the image is clicked.

## Pages Documentation

### MealPlan.js
- **Description**: Displays a generated weekly meal plan with a scrollable list of days. Shows an average nutrition overview with calculated daily average values for calories, carbs, protein, and fat.
- **Props**: None
- **State**:
  - `mealPlan` (array): Holds the weekly meal data from mockMealData.

### Preferences.js
- **Description**: Collects user input on meal preferences, dietary restrictions, goals, and physical metrics. Includes a button to generate the meal plan.
- **Props**: None
- **State**:
  - `selectedMeals` (array): Tracks selected meal types.
  - `dietaryRestrictions` (string): Stores dietary restrictions input.
  - `selectedGoal` (string): Tracks the selected health goal.
  - `weight` and `height` (string): Store the user’s weight and height.
- **Functions**:
  - `handleGenerateMealPlan()`: Navigates to the Meal Plan page.

### MealPlanDetail.js
- **Description**: Displays the meal plan in more detail, showing the plan for each day and displaying nutritional information and the ingredients/price for each meal.
- **State**:
  - `mealType` (array): Holds the type of meal (breakfast, lunch, dinner).
  - `mealData` (array): Holds data of meal, such as nutrition and ingredients.
- **Functions**:
  - `handlePreviousDay()`: Proceeds to the next meal.
  - `handleNextDay()`: Proceeds to the previous meal.

## Setup Instructions
1. **Clone the Repository**: 
   - git clone https://github.com/yongjejeon/SweetVioletWeb.git
2. **Install Dependencies**: Run `npm install` to install required packages.
3. **Start the React Development Server**: Use `npm start` to start the application.
4. **View Application**: Open `http://localhost:3000` in a browser to access the frontend.

## Development Process

### Design Decisions
- **Preferences Collection**: The Preferences Page allows users to select multiple meal types and enter personalized dietary preferences, providing a tailored meal planning experience.
- **Scrollable Meal Plan View**: The Meal Plan Page displays each day’s meals in a horizontally scrollable view to enhance readability.

### Technical Choices
- **React**: Used for building a modular frontend with components for each part of the UI (e.g., Preferences, Meal Plan, Buttons). React’s component-based structure ensures that each part of the UI is reusable and maintains a clear separation of concerns.
- **State Management**: Simple React state was used for managing UI state, keeping the application lightweight and straightforward for this scope of the project.

## AI Usage
- **AI Assistance**: AI was used to generate initial code templates for component structure and mock data, provide guidance on best practices for component reusability, and suggest improvements for code organization.
- **Justification**: Using AI accelerated development by generating base code, allowing for faster iterations and testing of features like average nutrient calculations and component layout.
