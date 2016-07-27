//
//  SSImageGenerator.m
//  SmartScreenshot
//
//  Created by Longfei Wu on 7/27/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "SSImageGenerator.h"

@implementation SSImageGenerator

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(generateImage:(NSArray *)images callback:(RCTResponseSenderBlock)callback)
{
  CGFloat totalHeight = 0.0f;
  CGFloat totalScale = [(NSNumber *)images[0][@"scale"] floatValue];
  CGFloat totalWidth = [(NSNumber *)images[0][@"resizeWidth"] floatValue] * totalScale;
  for (NSDictionary *image in images) {
    CGFloat resizeHeight = [(NSNumber *)image[@"resizeHeight"] floatValue];
    CGFloat topInset = [(NSNumber *)image[@"topInset"] floatValue];
    CGFloat bottomInset = [(NSNumber *)image[@"bottomInset"] floatValue];
    totalHeight += (resizeHeight - topInset - bottomInset);
  }
  totalHeight = totalHeight * totalScale;
  
  CGSize contextSize = CGSizeMake(totalWidth, totalHeight);
  UIGraphicsBeginImageContextWithOptions(contextSize, NO, 1.0);

  // iterately drawing cropped images in current context
  CGFloat currentDrawingOffsetY = 0;
  for (NSDictionary *image in images) {
    CGFloat resizeHeight = [(NSNumber *)image[@"resizeHeight"] floatValue] * totalScale;
    CGFloat resizeWidth = [(NSNumber *)image[@"resizeWidth"] floatValue] * totalScale;
    CGFloat topInset = [(NSNumber *)image[@"topInset"] floatValue] * totalScale;
    CGFloat bottomInset = [(NSNumber *)image[@"bottomInset"] floatValue] * totalScale;
    NSString *file = image[@"path"];
    UIImage *imageObject = [[UIImage alloc] initWithContentsOfFile:file];
    UIImage *resizeImageObject = [self imageWithImage:imageObject scaledToSize:CGSizeMake(resizeWidth, resizeHeight)];
    UIImage *cropImageObject = [self imageWithImage:resizeImageObject cropRect:CGRectMake(0, topInset, resizeImageObject.size.width, resizeImageObject.size.height - topInset - bottomInset)];
    
    // draw current image
    [cropImageObject drawInRect:CGRectMake(0, currentDrawingOffsetY, cropImageObject.size.width, cropImageObject.size.height)];
    currentDrawingOffsetY += cropImageObject.size.height;
  }
  
  UIImage *resultImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  UIImageWriteToSavedPhotosAlbum(resultImage,
                                 self, // send the message to 'self' when calling the callback
                                 @selector(thisImage:hasBeenSavedInPhotoAlbumWithError:usingContextInfo:), // the selector to tell the method to call on completion
                                 NULL); // you generally won't need a contextInfo here
  callback(@[@0]);
}

- (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)newSize {
  UIGraphicsBeginImageContextWithOptions(newSize, NO, 0.0);
  [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
  UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return newImage;
}

- (UIImage *)imageWithImage:(UIImage *)resizeImage cropRect:(CGRect)cropRect {
  cropRect = CGRectMake(cropRect.origin.x * resizeImage.scale,
                        cropRect.origin.y * resizeImage.scale,
                        cropRect.size.width * resizeImage.scale,
                        cropRect.size.height * resizeImage.scale);
  
  CGImageRef imageRef = CGImageCreateWithImageInRect([resizeImage CGImage], cropRect);
  UIImage *newImage = [UIImage imageWithCGImage:imageRef scale:resizeImage.scale orientation:resizeImage.imageOrientation];
  CGImageRelease(imageRef);
  return newImage;
}

- (void)thisImage:(UIImage *)image hasBeenSavedInPhotoAlbumWithError:(NSError *)error usingContextInfo:(void *)cxtInfo {
  // TODO:
}

@end
