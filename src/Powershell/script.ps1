#Set-Location "C:\Users\martin.petrucci\Desarrollo\femp-nuevo\femp\femp.war\view\ux"

#$JSONFile = "C:\Users\martin.petrucci\Documents\Powershell\JSES.html"
#$JSONFile = "C:\Users\martin.petrucci\Documents\Powershell\prueba.json"
$JSONFile = "C:\Users\martin.petrucci\junctions\src\Data\missingJunctions.json"
Remove-Item $JSONFile
New-Item $JSONFile
Add-Content $JSONFile '['

#Regular Expressions
#$urlVariableDeclarationRegEx = '\w*\s\*=s*"/femp'
#$urlVariableDeclarationRegEx= "[(var)(let)(const)]+\s[A-z]+\s{0,1}=\s{0,1}.\/femp"
$xd = "\w*\s\=\s{0,1}[`'`"]/femp"
$fempRegEx = '/femp'
#$containsJunction = 'junction\s*(\+)?(\s*|\.concat).*' + $name + '.*'
$lineId = 1
function test-js([string]$path) {
    Set-Location $path 
    if (-Not (Test-Path "js")) {
        Get-ChildItem -Exclude *.jsp | ForEach-Object {
            Set-Location $_
            test-js
            Set-Location ..
        }
    }
    else {
        Set-Location js
        Get-ChildItem | ForEach-Object {
            #iteramos cada archivo
            $file = $_
            $lineNumber = 1
            $containsJunction = $true
            $junctionErrors = @()
            $urlVariables = @()

            Get-Content $file | ForEach-Object {
                #iteramos cada linea
                $lineContent = $_
                $isComment = $lineContent -Match '\s*\/\/'
                if ((-Not $isComment) -and ($lineContent -Match $fempRegEx)) {
                    #valida si es una URL a femp y no está comentada
                    if (-Not ($lineContent -Match "junction")) {
                        #valida que tenga la junction
                        #no tiene la junction, puede que sea una declaracion de variable
                        if ($lineContent -Match $xd) {
                            #$variableName = ($Matches[0] -split "=")[0].Trim() #guardo el nombre de la variable

                            $varObj = @{
                                id = Get-Random -Minimum 1 -Maximum 5000
                                line    = $lineNumber
                                content = [string]$lineContent
                                solved = $false
                            }
                            $urlVariables += $varObj #lo agrego a la lista de variables
                        }
                        else {
                            #no es una declaracion de variable y se falta la junction
                            $containsJunction = $false
                            $errObj = @{
                                id = Get-Random -Minimum 5001 -Maximum 10000
                                line    = $lineNumber
                                content = [string]$lineContent
                                solved = $false
                            }
                            $junctionErrors += $errObj
                        }
                    }
                }
                $lineNumber++
            }
            if (-Not $containsJunction) {
                $name = $file.BaseName
 #               $path = $file.FullName
                $file.FullName -match ".+femp.war"
                $mm = $file.FullName.replace($Matches[0], "\femp.war")
                
                $filePath = "https:\\globaldevtools.bbva.com\bitbucket\projects\BEAR\repos\femp\browse" + $mm
                $file.FullName -match "(mod|ux)\\\w+\\\w*"
                $circuito = $Matches[0]
                $circuito = $circuito.replace("mod\", "")
                $circuito = $circuito.replace("ux\", "")
                $circuito = $circuito.replace("\js", "")
                $finalObject = @{
                    name      = $name
                    path      = $filePath
#                    path      = $path
                    errors    = $junctionErrors
                    variables = $urlVariables
                    solved = $false
                    circuito = $circuito
                    show = $true
                }
                $lineId++
                $finaljson = ConvertTo-Json $finalObject
                $finaljson += ','
                Add-Content $JSONFile $finaljson
            }
        }
        Set-Location ..
    }
}



$parteNueva = "C:\Users\martin.petrucci\Downloads\femp-wp\femp\femp.war\view\ux"
$parteVieja = "C:\Users\martin.petrucci\Downloads\femp-wp\femp\femp.war\mod"
test-js($parteNueva)
test-js($parteVieja)
Add-Content $JSONFile ']'
Invoke-Item $JSONFile
Set-Location "C:\Users\martin.petrucci\junctions\src\Powershell"

#$jsonList = ConvertTo-Json $finalList
#write-host $jsonList
#Add-Content $JSONFile $jsonList
#Add-Content 

