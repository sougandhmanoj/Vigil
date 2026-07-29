import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
  fputs("Usage: swift extract_frames.swift input.mov outputDir\n", stderr)
  exit(1)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2], isDirectory: true)
try FileManager.default.createDirectory(at: outputURL, withIntermediateDirectories: true)

let asset = AVAsset(url: inputURL)
let duration = CMTimeGetSeconds(asset.duration)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let sampleCount = 8
for index in 0..<sampleCount {
  let seconds = duration * Double(index) / Double(max(sampleCount - 1, 1))
  let time = CMTime(seconds: seconds, preferredTimescale: 600)
  do {
    let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmap = NSBitmapImageRep(cgImage: cgImage)
    guard let data = bitmap.representation(using: .png, properties: [:]) else { continue }
    let fileURL = outputURL.appendingPathComponent(String(format: "frame-%02d.png", index))
    try data.write(to: fileURL)
  } catch {
    fputs("Failed frame \(index): \(error)\n", stderr)
  }
}
