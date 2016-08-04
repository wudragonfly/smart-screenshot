//
//  SSImageMarginDector.m
//  SmartScreenshot
//
//  Created by Longfei Wu on 8/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "SSImageMarginDetector.h"

@implementation SSImageMarginDetector

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(detectMarginsOfImages:(NSArray *)images callback:(RCTResponseSenderBlock)callback)
{
  NSMutableArray *imageTopBottomInsetArray = [[NSMutableArray alloc] init];
  for (NSDictionary *image in images) {
    NSMutableDictionary *outputImage = [NSMutableDictionary dictionaryWithDictionary:image];
    NSNumber *topInset = [NSNumber numberWithDouble:0.1 * [(NSNumber *)image[@"height"] doubleValue]];
    NSNumber *bottomInset = [NSNumber numberWithDouble:0.1 * [(NSNumber *)image[@"height"] doubleValue]];
    outputImage[@"topInset"] = topInset;
    outputImage[@"bottomInset"] = bottomInset;
    [imageTopBottomInsetArray addObject:outputImage];
  }
  callback(@[[NSNull null], imageTopBottomInsetArray]);
}

@end
