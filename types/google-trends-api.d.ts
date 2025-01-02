declare module 'google-trends-api' {
  interface InterestOverTimeOptions {
    keyword: string;
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    category?: number;
    granularTimeResolution?: boolean;
  }

  interface TimelineData {
    time: string;
    value: number[];
    formattedValue: string[];
  }

  interface InterestOverTimeResult {
    default: {
      timelineData: TimelineData[];
    };
  }

  function interestOverTime(options: InterestOverTimeOptions): Promise<string>;

  export = {
    interestOverTime
  };
}