import React from 'react';
import { Card } from '../../ui/Card';
import { GreetingProps } from '../../../types';

/**
 * Personalized greeting card component
 */
export const GreetingCard: React.FC<GreetingProps> = ({
  user,
  timeOfDay
}) => {
  const getGreeting = () => {
    const greetings = {
      morning: '🌅 Good morning',
      afternoon: '☀️ Good afternoon',
      evening: '🌙 Good evening'
    };
    return greetings[timeOfDay];
  };

  const getMotivationalMessage = () => {
    const messages = {
      morning: "Ready to start a productive day?",
      afternoon: "Hope your day is going great!",
      evening: "Time to relax and unwind!"
    };
    return messages[timeOfDay];
  };

  return (
    <Card className="text-center transform hover:scale-105 transition-transform duration-200">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          {getGreeting()}{user ? `, ${user.name}` : ''}!
        </h2>
        
        <p className="text-lg text-gray-600">
          {getMotivationalMessage()}
        </p>

        {user && (
          <div className="flex items-center justify-center space-x-3 pt-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={`${user.name}'s avatar`}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-medium text-blue-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="text-left">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};