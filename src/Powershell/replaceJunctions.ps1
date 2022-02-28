#Regular expressions
$esAjax = "url\s*:\s*[`"`']/femp.*"
$urlReg = "[`"`']/femp.*"

$JSONFile = "C:\Users\martin.petrucci\junctions\src\Data\missingJunctions.json" #url del json
$content = Get-Content $JSONFile | ConvertFrom-Json #guardamos el json en una variable para luego iterarla
$output = "C:\Users\martin.petrucci\junctions\src\Powershell\output.txt"
New-Item "C:\Users\martin.petrucci\junctions\src\Powershell\output.txt"
$content | ForEach-Object { #Por cada archivo
    $file = $_
    Get-Content $file.localPath | ForEach-Object { #Por cada linea del archivo
        $lineContent = $_   #Obtenemos la linea
        if ($lineContent -match $esAjax) {  #Verificamos si hay un llamado ajax -> url: /femp/bla/..
            $lineContent -match $urlReg     #Obtenemos el contenido de la linea a partir de "/femp/.."
            $url = $Matches[0]              #La guardamos en la variable $url
            $old = $lineContent             #Guardamos el viejo contenido en $old
            $new = $_.replace($url, "junctionGlobal + " + $url)     #La nueva linea es reemplazar la url vieja anteponiendo "junctionGlobal +" 
            $res = @{           #Guardamos la vieja y nueva linea en un objeto para despues reemplazarlo
                old = $old
                new = $new
            }
            $results += $res    #Lo agregamos a la lista de resultados
        }
    }   #Salimos del Get-Content 
    Add-Content $output $file.name     
    $results | ForEach-Object {#Iteramos cada objeto de los resultados y mostramos la vieja y nueva linea
        $old = "old ->" + $_.old
        $new = "new ->" + $_.new
        Add-Content $output $old
        Add-Content $output $new
        (Get-Content $file.localPath).replace($_.old, $_.new) | Set-Content $file.localPath #Reemplazamos la linea vieja por la nueva en el archivo correspondiente
    }
    $results = @()  #Volvemos a setear la lista en vacío para el proximo archivo
}