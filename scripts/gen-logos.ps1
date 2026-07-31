Add-Type -AssemblyName System.Drawing

function Add-BarRect {
  param([System.Drawing.Graphics]$g, [double]$s, [double]$ox, [double]$oy,
        [double]$x, [double]$y, [double]$w, [double]$h, [System.Drawing.Brush]$b)
  $rr = 4.0 * $s
  $rx = $ox + $x * $s; $ry = $oy + $y * $s; $rw = $w * $s; $rh = $h * $s
  if ($rr -gt $rh) { $rr = $rh }
  $pp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $pp.AddArc([single]$rx, [single]$ry, [single]$rr, [single]$rr, 180, 90)
  $pp.AddArc([single]($rx + $rw - $rr), [single]$ry, [single]$rr, [single]$rr, 270, 90)
  $pp.AddArc([single]($rx + $rw - $rr), [single]($ry + $rh - $rr), [single]$rr, [single]$rr, 0, 90)
  $pp.AddArc([single]$rx, [single]($ry + $rh - $rr), [single]$rr, [single]$rr, 90, 90)
  $pp.CloseFigure()
  $g.FillPath($b, $pp)
}

function Draw-Mark {
  param([int]$size, [bool]$light, [string]$bgHex, [string]$outFile)
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'

  if ($light) {
    $frameC = [System.Drawing.Color]::FromArgb(43, 101, 184)
    $barC   = [System.Drawing.Color]::FromArgb(10, 18, 32)
    $goldC  = [System.Drawing.Color]::FromArgb(176, 141, 79)
  } else {
    $frameC = [System.Drawing.Color]::FromArgb(127, 176, 242)
    $barC   = [System.Drawing.Color]::FromArgb(242, 245, 250)
    $goldC  = [System.Drawing.Color]::FromArgb(213, 184, 133)
  }

  if ($bgHex) {
    $bgc = [System.Drawing.ColorTranslator]::FromHtml($bgHex)
    $bgBrush = New-Object System.Drawing.SolidBrush($bgc)
    $r = [double]$size * 0.3
    $p0 = New-Object System.Drawing.Drawing2D.GraphicsPath
    $p0.AddArc([single]0, [single]0, [single]$r, [single]$r, 180, 90)
    $p0.AddArc([single]($size - $r), [single]0, [single]$r, [single]$r, 270, 90)
    $p0.AddArc([single]($size - $r), [single]($size - $r), [single]$r, [single]$r, 0, 90)
    $p0.AddArc([single]0, [single]($size - $r), [single]$r, [single]$r, 90, 90)
    $p0.CloseFigure()
    $g.FillPath($bgBrush, $p0)
    $inset = [double]$size * 0.12
  } else { $inset = 0.0 }

  $s = ([double]$size - 2 * $inset) / 64.0
  $ox = $inset; $oy = $inset
  $small = $size -le 48
  if ($small) { $strokeW = 5.0 * $s; $fx = 10.0; $fy = 10.0; $fw = 44.0; $cr = 6.0; $topStop = 45.0; $rightStop = 30.0 }
  else { $strokeW = 3.2 * $s; $fx = 5.0; $fy = 5.0; $fw = 54.0; $cr = 7.0; $topStop = 46.0; $rightStop = 28.0 }

  $pen = New-Object System.Drawing.Pen($frameC, [single]$strokeW)
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'; $pen.LineJoin = 'Round'

  $L = $ox + $fx * $s; $T = $oy + $fy * $s
  $R = $ox + ($fx + $fw) * $s; $B = $oy + ($fy + $fw) * $s
  $D = 2.0 * $cr * $s

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddLine([single]($ox + $topStop * $s), [single]$T, [single]($L + $cr * $s), [single]$T)
  $path.AddArc([single]$L, [single]$T, [single]$D, [single]$D, 270, -90)
  $path.AddLine([single]$L, [single]($T + $cr * $s), [single]$L, [single]($B - $cr * $s))
  $path.AddArc([single]$L, [single]($B - $D), [single]$D, [single]$D, 180, -90)
  $path.AddLine([single]($L + $cr * $s), [single]$B, [single]($R - $cr * $s), [single]$B)
  $path.AddArc([single]($R - $D), [single]($B - $D), [single]$D, [single]$D, 90, -90)
  $path.AddLine([single]$R, [single]($B - $cr * $s), [single]$R, [single]($oy + $rightStop * $s))
  $g.DrawPath($pen, $path)

  $bar42 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(107, $barC.R, $barC.G, $barC.B))
  $bar78 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(199, $barC.R, $barC.G, $barC.B))
  $goldBrush = New-Object System.Drawing.SolidBrush($goldC)

  if ($small) {
    Add-BarRect $g $s $ox $oy 19 38 24 7 $bar78
    Add-BarRect $g $s $ox $oy 19 27.5 24 7 $bar78
    Add-BarRect $g $s $ox $oy 25 17 31 8 $goldBrush
  } else {
    Add-BarRect $g $s $ox $oy 17 40 30 7 $bar42
    Add-BarRect $g $s $ox $oy 17 28.5 30 7 $bar78
    Add-BarRect $g $s $ox $oy 24 14 36 7 $goldBrush
  }

  $g.Dispose()
  $bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

$out = "public\brand\png"
New-Item -ItemType Directory -Force $out | Out-Null
foreach ($sz in 16, 32, 48, 64, 128, 256, 512, 1024) { Draw-Mark $sz $false $null "$out\mark-$sz.png" }
foreach ($sz in 64, 128, 256, 512, 1024) { Draw-Mark $sz $true $null "$out\mark-on-light-$sz.png" }
foreach ($sz in 256, 512, 1024) { Draw-Mark $sz $false '#060B16' "$out\avatar-$sz.png" }
Write-Output "generated $((Get-ChildItem $out).Count) files"
